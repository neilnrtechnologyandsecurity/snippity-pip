(() => {
  const tbody = document.querySelector('#entries');
  const status = document.querySelector('#status');
  const filter = document.querySelector('#filter');
  let records = [];
  const escapeCsv = value => {
    let text = String(value ?? '');
    // Prevent spreadsheet formula injection when the recipient opens an export.
    if (/^[\s]*[=+@\-\t\r]/.test(text)) text = "'" + text;
    return '"' + text.replace(/"/g,'""') + '"';
  };
  async function load() {
    status.textContent = 'Loading enquiries…';
    try {
      const url = '/api/admin/waitlist' + (filter.value ? '?course=' + encodeURIComponent(filter.value) : '');
      const response = await fetch(url,{cache:'no-store'});
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Could not load enquiries.');
      records = data.records || [];
      status.textContent = records.length + ' course enquiries shown (up to 1,000).';
      tbody.replaceChildren();
      for (const entry of records) {
        const tr = document.createElement('tr');
        for (const value of [entry.name,entry.email,entry.course,entry.created_at]) {
          const td = document.createElement('td');
          td.textContent = value || '';
          tr.append(td);
        }
        const tdStatus = document.createElement('td');
        tdStatus.textContent = entry.status;
        const tdActions = document.createElement('td');
        const chooser = document.createElement('select');
        chooser.setAttribute('aria-label','Change status for ' + entry.name);
        for (const option of ['new','contacted','invited']) {
          const el = document.createElement('option');
          el.value = option; el.textContent = option[0].toUpperCase() + option.slice(1);
          el.selected = option === entry.status;
          chooser.append(el);
        }
        chooser.addEventListener('change',async () => {
          chooser.disabled=true;
          const previous=entry.status;
          try {
            const response = await fetch('/api/admin/waitlist',{
              method:'PATCH',
              headers:{'content-type':'application/json'},
              body:JSON.stringify({id:entry.id,status:chooser.value})
            });
            if (!response.ok) throw new Error('Update failed.');
            entry.status=chooser.value;tdStatus.textContent=entry.status;
            status.textContent='Enquiry updated.';
          } catch { chooser.value=previous;status.textContent='Unable to save. Please try again.'; }
          finally {chooser.disabled=false;}
        });
        tdActions.append(chooser);
        tr.append(tdStatus,tdActions);
        tbody.append(tr);
      }
    } catch(error) {
      status.textContent = error.message || 'Unable to load enquiries.';
      tbody.replaceChildren();
    }
  }
  document.querySelector('#refresh').addEventListener('click',load);
  filter.addEventListener('change',load);
  document.querySelector('#download').addEventListener('click',() => {
    if (!records.length) {status.textContent='No enquiries to export.';return;}
    const values = [
      ['Name','Email','Course','Registered','Status','Consent recorded'],
      ...records.map(x=>[x.name,x.email,x.course,x.created_at,x.status,x.consent_at])
    ];
    const csv = '\uFEFF' + values.map(row => row.map(escapeCsv).join(',')).join('\r\n');
    const blob = new Blob([csv],{type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); link.href=url;link.download='snippity-pip-course-interests.csv';
    document.body.append(link);link.click();link.remove();
    setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  load();
})();