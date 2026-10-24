const lessons = [
 {title:'Welcome to your course',short:'Welcome',body:`
  <img class="lesson-image" src="/assets/salon-hero.jpg" alt="Pippin at work styling hair">
  <p class="lead">A good finish starts long before the last brush stroke.</p>
  <p>Welcome to a first look inside Curly Blow Dry Training. The course brings together the theory, consultation process, professional practice and practical techniques behind different blow-dry finishes.</p>
  <h2>Your learning journey</h2>
  <p>Start with the foundations, build your understanding of hair and explore three finishes: bouncy, Hollywood and beachy. The outline ends with a knowledge check and four practical case studies.</p>
  <div class="callout"><h3 style="margin-top:0">Make yourself at home.</h3><p>Choose a module from the menu. Mark the outlines you have explored and try the sample knowledge check. This preview saves progress in this browser, so you can come back to it.</p></div>
  <h2>What’s included in this preview?</h2>
  <ul><li>A guide to all six planned learning modules.</li><li>Sample learning prompts and a short knowledge check.</li><li>An example of a four-case-study practice checklist.</li></ul>
  <p class="small">The full teaching videos, approved manuals and formal assessments are not included here. Preview progress does not count towards a qualification.</p>`},
 {title:'Health, safety & professional practice',short:'Professional practice',body:`
  <p class="lead">A calm, organised approach is part of every professional service.</p>
  <p>This module establishes the professional foundations for the practical work. The full course will cover the relevant working procedures and the approved course materials.</p>
  <h2>Topics in this module</h2><ul><li>Health and safety within the working environment.</li><li>Hygiene, cleaning, disinfection and sterilisation.</li><li>COSHH, product handling and storage.</li><li>Risk assessment and first-aid arrangements.</li><li>Professional standards and preparation.</li></ul>
  <div class="callout"><h3 style="margin-top:0">A moment to reflect</h3><p>Think about your workstation. What needs checking before a client arrives? Consider the space, tools, products and information you need.</p></div>
  <p>This is a module outline, not a replacement for the approved health-and-safety teaching or your workplace procedures.</p>`},
 {title:'Client consultation',short:'Client consultation',body:`
  <p class="lead">Understand the person before you plan the finish.</p>
  <p>A consultation brings together the client’s expectations, their hair history and the practical details that help you plan an appropriate service.</p>
  <h2>Topics in this module</h2><ul><li>A structured consultation and accurate client records.</li><li>Medical history and contraindications, covered in the approved training.</li><li>Hair history, current routine and expectations.</li><li>Agreeing the desired finish and aftercare.</li></ul>
  <div class="callout"><h3 style="margin-top:0">Try a conversation starter</h3><p>“How would you like your hair to feel when you leave, and how do you usually style it at home?”</p></div>
  <h2>Make your plan personal</h2><p>Compare a client who wants a polished finish for an evening event with someone who wants relaxed movement for everyday wear. What would you ask each person before planning their service?</p>`},
 {title:'Understanding hair',short:'Understanding hair',body:`
  <p class="lead">The technique starts with knowing what you’re working with.</p>
  <p>This module explores the hair knowledge that informs your preparation and styling decisions, connecting the theory to the practical service.</p>
  <h2>Topics in this module</h2><ul><li>Hair structure and the hair growth cycle.</li><li>Different hair types and characteristics.</li><li>Considering the client’s hair when selecting an approach.</li><li>Connecting observations with the planned result.</li></ul>
  <div class="callout"><h3 style="margin-top:0">Look before you choose.</h3><p>Think about two clients with the same requested finish but different hair. Which observations would you record before deciding how to approach the service?</p></div>
  <p>Detailed theory and practical demonstrations will be supplied in the full course materials.</p>`},
 {title:'Blow-dry techniques',short:'Blow-dry techniques',body:`
  <p class="lead">Three finishes. A considered approach to each.</p>
  <p>This practical module connects preparation, tool selection and technique with the look your client wants.</p>
  <h2>The practical sequence</h2><ol><li>Prepare the hair and select the tools for the planned result.</li><li>Work through the selected finish.</li><li>Refine the finished look and explain aftercare.</li></ol>
  <h3>01 / Bouncy blow dry</h3><p>Explore volume, movement and a fuller-looking finish.</p>
  <h3>02 / Hollywood waves</h3><p>Explore a more polished, defined wave and the details of the final shape.</p>
  <h3>03 / Beachy finish</h3><p>Explore a relaxed result with softer, less uniform movement.</p>
  <div class="callout"><h3 style="margin-top:0">Practical teaching</h3><p>The full technique demonstrations and step-by-step teaching will be added with the approved course videos. This preview shows the module structure.</p></div>`},
 {title:'Assessment & case studies',short:'Assessment & case studies',body:`
  <p class="lead">Bring the learning together.</p>
  <p>The course outline includes a knowledge check, four practical case studies and a final submission. Here you can try a sample question and explore a local practice checklist.</p>
  <h2>A sample knowledge check</h2><form id="quiz-form"><fieldset style="padding:0;border:0;margin:0"><legend>What should you do before choosing your approach to a client’s blow dry?</legend>
  <label class="quiz-option"><input type="radio" name="answer" value="same" required>Use the same approach you used for the previous client.</label>
  <label class="quiz-option"><input type="radio" name="answer" value="consult">Discuss the desired result and consider the client’s hair.</label>
  <label class="quiz-option"><input type="radio" name="answer" value="product">Select a finishing product first.</label>
  </fieldset><button class="btn outline" type="submit">Check my answer <span aria-hidden="true">→</span></button><div id="quiz-feedback" role="status" aria-live="polite"></div></form>
  <h2>Your four case studies</h2><p>In the full course, you’ll follow the confirmed assessment brief and submit your work for review. These ticks are just a preview of progress tracking.</p><div class="case-list">${[1,2,3,4].map(n=>`<label class="case-check"><input type="checkbox" data-case="${n-1}">Case study ${n}</label>`).join('')}</div>
  <div class="callout"><h3 style="margin-top:0">Nothing is submitted here.</h3><p>This preview does not collect photographs, client records or assessment files. Your checklist is saved only in this browser.</p></div>
  <a class="text-link" href="/contact.html?interest=Training%20academy">Ask about the full course <span aria-hidden="true">↗</span></a>`}
];

const storageKey='snippity-pip-course-preview-v1';
let completed=[],cases=[false,false,false,false],storageAvailable=true;
try{const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');completed=Array.isArray(saved.completed)?[...new Set(saved.completed.filter(n=>Number.isInteger(n)&&n>=0&&n<lessons.length))]:[];cases=Array.isArray(saved.cases)&&saved.cases.length===4?saved.cases.map(Boolean):cases;}catch{storageAvailable=false;}
let current=0;
const content=document.querySelector('#lesson-content');
const lessonList=document.querySelector('#lesson-list');
function save(){try{localStorage.setItem(storageKey,JSON.stringify({completed,cases}));}catch{storageAvailable=false;document.querySelector('#storage-note').textContent='Progress is available for this visit only; browser storage is unavailable.';}}
function updateProgress(){
 document.querySelector('#progress-text').textContent=`${completed.length} of ${lessons.length}`;
 document.querySelector('#course-progress').value=completed.length;
 lessonList.innerHTML=lessons.map((lesson,i)=>`<li><button data-lesson="${i}" class="${i===current?'active':''}" ${i===current?'aria-current="step"':''}><span class="lesson-num">0${i+1}</span><span>${lesson.short}</span><span class="done" aria-label="${completed.includes(i)?'Preview explored':''}">${completed.includes(i)?'✓':''}</span></button></li>`).join('');
 lessonList.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>showLesson(Number(button.dataset.lesson),true)));
}
function showLesson(index,focus=false){
 current=Math.max(0,Math.min(lessons.length-1,index));
 const l=lessons[current];
 content.innerHTML=`<span class="eyebrow">Module 0${current+1} of 06 · Sample outline</span><h1>${l.title}</h1>${l.body}<div class="next-actions"><button class="btn" id="mark-complete">${completed.includes(current)?'Preview explored ✓':'Mark preview as explored'}</button>${current<lessons.length-1?'<button class="text-link" id="next-lesson">Next module <span aria-hidden="true">→</span></button>':'<a class="text-link" href="/academy.html">Back to the academy <span aria-hidden="true">↗</span></a>'}<span class="finish-text" id="completion-status" role="status">${completed.length===6?'You’ve explored all six module previews.':''}</span></div>`;
 updateProgress();
 document.querySelector('#mark-complete').addEventListener('click',()=>{
  if(!completed.includes(current))completed.push(current);save();updateProgress();
  document.querySelector('#mark-complete').textContent='Preview explored ✓';
  document.querySelector('#completion-status').textContent=completed.length===6?'You’ve explored all six module previews.':'Your preview progress is updated.';
 });
 document.querySelector('#next-lesson')?.addEventListener('click',()=>showLesson(current+1,true));
 document.querySelectorAll('[data-case]').forEach(box=>{box.checked=cases[Number(box.dataset.case)];box.addEventListener('change',()=>{cases[Number(box.dataset.case)]=box.checked;save();});});
 document.querySelector('#quiz-form')?.addEventListener('submit',event=>{
  event.preventDefault();const answer=new FormData(event.target).get('answer');const feedback=document.querySelector('#quiz-feedback');feedback.className='quiz-feedback';
  feedback.textContent=answer==='consult'?'That’s right. Start with the client’s expectations and the characteristics of their hair, then choose an appropriate approach.':'Try again. Start by understanding the client and their hair before choosing a technique or product.';
 });
 history.replaceState(null,'',`#module-${current+1}`);
 if(focus){content.focus({preventScroll:true});content.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
}
document.querySelector('#reset-progress').addEventListener('click',()=>{
 completed=[];cases=[false,false,false,false];try{localStorage.removeItem(storageKey);}catch{}showLesson(current);document.querySelector('#completion-status').textContent='Preview progress has been reset.';
});
const requested=/^#module-([1-6])$/.exec(location.hash);
showLesson(requested?Number(requested[1])-1:0);
if(!storageAvailable)document.querySelector('#storage-note').textContent='Progress is available for this visit only; browser storage is unavailable.';
