import test from 'node:test';
import assert from 'node:assert/strict';
import {createState,orderedLessons,moveLesson,publishedLessons,studentProgress,completeLesson,saveLesson,gradeQuiz,submitCase,reviewCase,sampleEvidence,validMediaUrl} from '../dist/academy-core.js';

test('lesson navigation follows module order and tutor reorder stays within a module',()=>{
 const state=createState();
 saveLesson(state,{id:'intro-extra',title:'A second welcome lesson',body:'Start here.',module:0,status:'published'});
 assert.deepEqual(publishedLessons(state).slice(0,3).map(l=>l.id),['welcome','intro-extra','practice']);
 assert.equal(moveLesson(state,'intro-extra',-1),true);
 assert.equal(orderedLessons(state)[0].id,'intro-extra');
 assert.equal(moveLesson(state,'practice',-1),false);
 assert.equal(moveLesson(state,'hollywood',-1),true);
 assert.ok(publishedLessons(state).findIndex(l=>l.id==='hollywood')<publishedLessons(state).findIndex(l=>l.id==='bouncy'));
});

test('draft lessons stay out of student content and become available on publication',()=>{
 const state=createState(),count=publishedLessons(state).length;
 const input={id:'new-topic',title:'A new practical topic',body:'A focused learning activity.',module:4,minutes:5,type:'reading',resources:[],status:'draft'};
 saveLesson(state,input);assert.equal(publishedLessons(state).length,count);
 assert.throws(()=>completeLesson(state,'amelia','new-topic'));
 saveLesson(state,{...input,status:'published'});assert.equal(publishedLessons(state).length,count+1);
 completeLesson(state,'amelia','new-topic');assert.ok(state.students[0].completed.includes('new-topic'));
 saveLesson(state,{...input,body:'Updated material to review.',status:'published'});assert.ok(!state.students[0].completed.includes('new-topic'));
});
test('quiz cannot pass with wrong or absent answers',()=>{
 assert.deepEqual(gradeQuiz([1,0,2]),{score:3,passed:true});
 assert.equal(gradeQuiz([0,0,2]).passed,false);assert.equal(gradeQuiz([]).passed,false);
});
test('student submission, tutor feedback and resubmission form one consistent record',()=>{
 const state=createState(),s=state.students[0];
 assert.throws(()=>submitCase(state,s.id,0,{model:'A',notes:'Too brief',files:[]}));
 submitCase(state,s.id,0,{model:'Example A',notes:'A thoughtful reflection on the planned result and what I learned.',files:[sampleEvidence()]});
 assert.equal(s.cases[0].status,'submitted');assert.throws(()=>reviewCase(state,s.id,0,'changes',''));
 reviewCase(state,s.id,0,'changes','Explain what you would improve next time.');assert.equal(s.cases[0].status,'changes');
 submitCase(state,s.id,0,{model:'Example A',notes:'I would allow more time to refine the finish next time.',files:[sampleEvidence()]});
 reviewCase(state,s.id,0,'approved','A useful and specific reflection.');assert.equal(s.cases[0].status,'approved');
 assert.equal(studentProgress(state,s).approved,1);assert.equal(studentProgress(state,s).ready,false);
 assert.throws(()=>reviewCase(state,s.id,0,'approved','Double review'));
});
test('certificate requires every lesson, a passed quiz and four approved case studies',()=>{
 const state=createState(),s=state.students[0];publishedLessons(state).forEach(l=>completeLesson(state,s.id,l.id));
 assert.equal(studentProgress(state,s).ready,false);s.quiz=gradeQuiz([1,0,2]);
 s.cases.forEach((c,i)=>{submitCase(state,s.id,i,{model:'Sample',notes:'Example reflective notes on the preparation and finished result.',files:[sampleEvidence()]});reviewCase(state,s.id,i,'approved','Example tutor approval.');});
 assert.equal(studentProgress(state,s).ready,true);
 saveLesson(state,{id:'extra',title:'New published lesson',body:'Further learning material.',module:4,minutes:5,status:'published'});
 assert.equal(studentProgress(state,s).ready,false);
});
test('media URLs do not accept executable or insecure schemes',()=>{
 assert.equal(validMediaUrl('https://example.com/video.mp4'),true);
 assert.equal(validMediaUrl('javascript:alert(1)'),false);assert.equal(validMediaUrl('data:text/html,test'),false);assert.equal(validMediaUrl('http://example.com/video.mp4'),false);
});
