const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.navlinks');
if(menuButton && menu){
  menuButton.addEventListener('click',()=>{
    const open=menuButton.getAttribute('aria-expanded')!=='true';
    menuButton.setAttribute('aria-expanded',String(open));menu.classList.toggle('open',open);
    menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    menuButton.textContent=open?'×':'☰';
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.classList.contains('open')){menuButton.click();menuButton.focus();}});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{if(menu.classList.contains('open'))menuButton.click();}));
}
const enquiryForm=document.querySelector('#enquiry-form');
if(enquiryForm){
 const subject=document.querySelector('#interest');
 const query=new URLSearchParams(location.search).get('interest');
 if(query && [...subject.options].some(o=>o.value===query))subject.value=query;
 let draft='';
 enquiryForm.addEventListener('submit',event=>{
  event.preventDefault();if(!enquiryForm.reportValidity())return;
  const data=new FormData(enquiryForm);
  draft=`Hello Pippin,\n\nI'm getting in touch about ${data.get('interest').toLowerCase()}.\n\n${data.get('message')}\n\nName: ${data.get('name')}\nReply email: ${data.get('email')}\n\nThank you!`;
  const mail=`mailto:thesnippitypip@hotmail.com?subject=${encodeURIComponent('Website enquiry — '+data.get('interest'))}&body=${encodeURIComponent(draft)}`;
  window.location.href=mail;
  const status=document.querySelector('#form-status');
  status.textContent='Your email draft is ready. Send it from your email app to complete your enquiry. If no app opens, use Copy message below and email thesnippitypip@hotmail.com.';
  document.querySelector('#copy-message').hidden=false;
 });
 document.querySelector('#copy-message').addEventListener('click',async()=>{
  const status=document.querySelector('#form-status');
  try{await navigator.clipboard.writeText(draft);status.textContent='Message copied. Paste it into an email to thesnippitypip@hotmail.com.';}
  catch{status.textContent='Your browser could not copy automatically. Please select and copy the message below.';const area=document.createElement('textarea');area.value=draft;area.setAttribute('aria-label','Your enquiry to copy');status.after(area);area.focus();area.select();}
 });
}
