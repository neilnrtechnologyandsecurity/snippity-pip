export const DEMO_PASSWORD='LearnWithPip';
export const STORAGE_KEY='snippity-academy-demo-v2';
export const SESSION_KEY='snippity-academy-session-v2';
export const MODULES=['Welcome','Professional practice','Client consultation','Understanding hair','Practical techniques','Assessment'];
export const CASE_NAMES=['Bouncy blow dry','Hollywood waves','Beachy finish','Your chosen finish'];
export const QUESTIONS=[
 {question:'What comes before choosing your blow-dry technique?',options:['Choose the strongest heat setting.','Discuss the desired result and consider the client’s hair.','Use the same approach for every client.'],answer:1,explanation:'The consultation and the client’s hair inform your choice of approach.'},
 {question:'Which finish is the most relaxed in this course outline?',options:['Beachy finish.','Hollywood waves.','A defined, polished wave.'],answer:0,explanation:'The beachy finish focuses on relaxed, less uniform movement.'},
 {question:'What belongs in a reflective case study?',options:['Only a photograph of the final result.','A client’s full medical records.','Your plan, the result and what you would improve.'],answer:2,explanation:'A useful reflection connects your plan, the outcome and your next learning step.'}
];
const emptyCases=()=>CASE_NAMES.map((title,i)=>({id:i,title,notes:'',model:'',files:[],status:'empty',feedback:'',submittedAt:null,reviewedAt:null}));
const resource={id:'starter-workbook',name:'Blow-dry practice workbook.pdf',url:'/assets/blow-dry-practice-workbook.pdf',type:'application/pdf',size:0};
export function createState(){
 const lessons=[
 {id:'welcome',module:0,title:'Welcome to your next chapter',minutes:3,type:'video',status:'published',videoUrl:'/assets/academy-welcome.mp4',videoFile:null,resources:[resource],body:'Welcome to Curly Blow Dry Training. This short example welcome video introduces the journey from your first lesson to feedback on your practical work.\n\nWork through the lessons, download the workbook and check your understanding. Then prepare four case studies for your tutor. You can return to completed lessons whenever you need a refresher.\n\nThis demonstration shows how the online experience could work. The teaching materials and practical assessment criteria will be confirmed before the real course opens.'},
 {id:'practice',module:1,title:'Prepare for a professional service',minutes:6,type:'reading',status:'published',videoUrl:'',resources:[resource],body:'Good preparation helps you give your client your full attention. This lesson introduces the professional practice module.\n\nThe full teaching would cover hygiene, cleaning and disinfection, safe use and storage of products, risk assessments and the procedures you follow in your working environment.\n\nReflection prompt: list the checks you would make before your client arrives. Think about the workstation, tools, products and the information you need.\n\nThis sample is an introduction, not a substitute for approved safety training or your workplace procedures.'},
 {id:'consultation',module:2,title:'Start with the right conversation',minutes:7,type:'reading',status:'published',videoUrl:'',resources:[resource],body:'A consultation helps you understand the person before you plan the finish.\n\nAsk what the client would like to achieve, how they usually wear their hair and how much time they want to spend maintaining the result. Agree what you are aiming for before you begin.\n\nTry this conversation starter: “How would you like your hair to feel when you leave, and how do you normally style it at home?”\n\nIn your workbook, compare a polished evening look with a relaxed everyday finish. What would you ask each client? Keep any practice records anonymous.'},
 {id:'hair',module:3,title:'Get to know the hair you are working with',minutes:8,type:'reading',status:'published',videoUrl:'',resources:[],body:'Hair knowledge helps you connect what you notice with the approach you choose.\n\nThe full module explores structure, the growth cycle, hair types and characteristics. Those observations belong alongside the consultation when you plan the service.\n\nReflection prompt: two clients request the same finish but have very different hair. What would you want to understand before selecting tools and products?\n\nDetailed hair theory and approved demonstrations will form part of the finished course.'},
 {id:'bouncy',module:4,title:'Bouncy blow dry: plan the finish',minutes:9,type:'reading',status:'published',videoUrl:'',resources:[resource],body:'The bouncy finish is about volume and movement. Begin with the look you have agreed with your client and consider how you will evaluate the result.\n\nThis sample lesson shows where a full practical demonstration, preparation notes and tool guidance would sit in the course.\n\nUse your workbook to record your plan, observations and a reflection after practice. What worked well, and what would you change next time?'},
 {id:'hollywood',module:4,title:'Hollywood waves: shape and polish',minutes:10,type:'reading',status:'published',videoUrl:'',resources:[],body:'Hollywood waves explore a more defined, polished finish. The practical teaching would demonstrate the process and the details that bring the final shape together.\n\nConsider the result you are aiming for and how it differs from a relaxed, beachy finish. What would you look for when reviewing the final look?\n\nFull technique videos can be added by the tutor in the course builder. The text here is sample course content.'},
 {id:'beachy',module:4,title:'Beachy finish: relaxed movement',minutes:8,type:'reading',status:'published',videoUrl:'',resources:[],body:'A beachy finish has a more relaxed character, with softer and less uniform movement.\n\nThink about how the intended result changes your planning and how you would explain the finish to your client.\n\nPractice reflection: compare your intended look with your result. Note one thing you like and one thing you would refine.'},
 {id:'aftercare',module:4,title:'Finishing touches and aftercare',minutes:5,type:'reading',status:'published',videoUrl:'',resources:[resource],body:'A professional service includes the conversation at the end. Check how the client feels about the finish and talk through appropriate care.\n\nThe full course would connect aftercare to the client’s hair, the service and the products used.\n\nBefore moving on to your knowledge check, review your notes. For your case studies, explain the plan, the outcome and what you learned.'}
 ];
 const students=[
 {id:'amelia',name:'Amelia Carter',email:'student@example.com',initials:'AC',completed:['welcome'],quiz:null,cases:emptyCases(),notes:{}},
 {id:'sophie',name:'Sophie Bennett',email:'sophie@example.com',initials:'SB',completed:['welcome','practice','consultation','hair','bouncy','hollywood'],quiz:{score:3,passed:true},cases:emptyCases(),notes:{}},
 {id:'grace',name:'Grace Morgan',email:'grace@example.com',initials:'GM',completed:lessons.map(l=>l.id),quiz:{score:3,passed:true},cases:emptyCases(),notes:{}}
 ];
 students[1].cases[0]={...students[1].cases[0],status:'submitted',model:'Practice model A',notes:'I planned a finish with more movement and volume. I recorded the starting point, worked through my plan and compared the result with the agreed look. Next time I would allow more time for refining the finish.',files:[sampleEvidence()],submittedAt:'2026-10-23T10:30:00Z'};
 students[1].cases[1]={...students[1].cases[1],status:'approved',notes:'Example reflection for a defined wave finish.',model:'Practice model B',feedback:'A clear reflection. Keep linking your preparation choices to the intended finish.',files:[sampleEvidence()],submittedAt:'2026-10-22T10:30:00Z'};
 students[2].cases=emptyCases().map(c=>({...c,status:'approved',model:'Example practice model',notes:'Demonstration case study.',feedback:'Reviewed in this example learner record.',files:[sampleEvidence()]}));
 return {version:2,course:{title:'Curly Blow Dry Training',description:'Build your understanding. Develop your technique. Grow your confidence.',lessons},students,announcement:'Welcome to the academy. Take your time with each lesson, keep your workbook close and use the case studies to reflect on your progress.'};
}
export function sampleEvidence(){return {id:'sample-evidence',name:'Example case-study evidence.svg',url:'/assets/example-case-study.svg',type:'image/svg+xml',size:0};}
export function orderedLessons(state){return [...state.course.lessons].sort((a,b)=>a.module-b.module);}
export function publishedLessons(state){return orderedLessons(state).filter(l=>l.status==='published');}
export function moveLesson(state,id,direction){
 const lessons=orderedLessons(state),i=lessons.findIndex(l=>l.id===id),j=i+direction;
 if(i<0||![-1,1].includes(direction)||!lessons[j]||lessons[i].module!==lessons[j].module)return false;
 [lessons[i],lessons[j]]=[lessons[j],lessons[i]];state.course.lessons=lessons;return true;
}
export function studentProgress(state,student){
 const lessons=publishedLessons(state),done=lessons.filter(l=>student.completed.includes(l.id)).length,approved=student.cases.filter(c=>c.status==='approved').length;
 return {done,total:lessons.length,percent:lessons.length?Math.round(done/lessons.length*100):0,approved,quizPassed:!!student.quiz?.passed,ready:lessons.length>0&&done===lessons.length&&!!student.quiz?.passed&&approved===4};
}
export function completeLesson(state,studentId,lessonId){
 const s=state.students.find(s=>s.id===studentId),l=state.course.lessons.find(l=>l.id===lessonId&&l.status==='published');
 if(!s||!l)throw Error('That lesson is not available.');if(!s.completed.includes(lessonId))s.completed.push(lessonId);
}
export function gradeQuiz(answers){const score=QUESTIONS.filter((q,i)=>Number(answers[i])===q.answer&&answers[i]!==null&&answers[i]!==undefined).length;return {score,passed:score===QUESTIONS.length};}
export function saveLesson(state,input){
 if(!String(input.title||'').trim())throw Error('Give your lesson a title.');
 if(!String(input.body||'').trim())throw Error('Add some lesson notes before saving.');
 const existing=state.course.lessons.find(l=>l.id===input.id);
 const next={...input,title:input.title.trim(),body:input.body.trim(),minutes:Math.max(1,Math.min(240,Number(input.minutes)||5)),module:Math.max(0,Math.min(5,Number(input.module)||0)),status:input.status==='published'?'published':'draft'};
 if(existing){Object.assign(existing,next);state.students.forEach(s=>{s.completed=s.completed.filter(id=>id!==existing.id);});}
 else state.course.lessons.push(next);
 return next;
}
export function submitCase(state,studentId,caseIndex,data){
 const s=state.students.find(s=>s.id===studentId);const c=s?.cases[caseIndex];if(!c)throw Error('Case study not found.');
 if(!data.model.trim()||data.notes.trim().length<20)throw Error('Add a model reference and a reflection of at least 20 characters.');
 if(!data.files.length)throw Error('Attach evidence or use the example file.');
 Object.assign(c,{model:data.model.trim(),notes:data.notes.trim(),files:data.files,status:'submitted',submittedAt:new Date().toISOString()});
}
export function reviewCase(state,studentId,caseIndex,status,feedback){
 const c=state.students.find(s=>s.id===studentId)?.cases[caseIndex];if(!c||c.status!=='submitted')throw Error('This case study is not awaiting review.');
 if(!['approved','changes'].includes(status))throw Error('Choose a review decision.');
 if(!feedback.trim())throw Error('Add feedback for the student.');
 c.status=status;c.feedback=feedback.trim();c.reviewedAt=new Date().toISOString();
}
export function validMediaUrl(value){if(!value)return true;try{const u=new URL(value);return u.protocol==='https:';}catch{return false;}}
