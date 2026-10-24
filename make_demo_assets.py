from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4

out=Path(__file__).parent/'dist/assets'
c=canvas.Canvas(str(out/'blow-dry-practice-workbook.pdf'),pagesize=A4)
c.setTitle('The Snippity Pip - Example practice workbook')
W,H=A4
green=HexColor('#173f35'); gold=HexColor('#af792e'); cream=HexColor('#f7f5ed'); muted=HexColor('#5c6c61')
c.setFillColor(cream);c.rect(0,0,W,H,fill=1,stroke=0)
c.setFillColor(green);c.rect(0,H-150,W,150,fill=1,stroke=0)
c.setFillColor(HexColor('#edce83'));c.setFont('Helvetica-Bold',9);c.drawString(44,H-37,'THE SNIPPITY PIP  /  TRAINING ACADEMY')
c.setFillColor(cream);c.setFont('Times-Roman',30);c.drawString(44,H-82,'Your practice workbook.')
c.setFont('Helvetica',10);c.drawString(44,H-111,'Curly Blow Dry Training - example learning resource')
c.setFillColor(muted);c.setFont('Helvetica',9);c.drawString(44,H-179,'Use anonymous model references. This sample is not an assessment form.')
c.setFillColor(green);c.setFont('Helvetica-Bold',9);c.drawString(44,H-210,'LEARNER');c.drawString(325,H-210,'DATE')
c.setStrokeColor(HexColor('#bec9b8'));c.line(44,H-233,290,H-233);c.line(325,H-233,550,H-233)
sections=[('01  YOUR PLAN','Model reference, requested finish and points from your consultation.'),('02  YOUR OBSERVATIONS','What did you notice? How did this influence your approach?'),('03  REFLECT ON YOUR RESULT','What worked well? What would you refine next time?'),('04  YOUR NEXT STEP','Aftercare discussion and a personal learning goal.')]
y=H-274
for title,sub in sections:
 c.setFillColor(green);c.setFont('Helvetica-Bold',10);c.drawString(44,y,title)
 c.setFillColor(muted);c.setFont('Helvetica',9);c.drawString(44,y-20,sub)
 for k in range(2):c.line(44,y-43-k*21,550,y-43-k*21)
 y-=112
c.setFillColor(gold);c.setFont('Helvetica-Bold',8);c.drawString(44,52,'DEMONSTRATION RESOURCE - NOT AN ACCREDITED ASSESSMENT')
c.setFillColor(muted);c.setFont('Helvetica',8);c.drawString(44,35,'Full teaching, assessment criteria and certificate arrangements will be confirmed before enrolment.')
c.save()
(out/'example-case-study.svg').write_text('''<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="700" viewBox="0 0 1100 700"><rect width="1100" height="700" fill="#f7f5ed"/><text x="60" y="70" font-family="Arial" font-size="20" fill="#173f35">THE SNIPPITY PIP / EXAMPLE EVIDENCE</text><rect x="60" y="120" width="470" height="390" rx="15" fill="#dce4d7"/><rect x="570" y="120" width="470" height="390" rx="15" fill="#dce4d7"/><g font-family="Arial" text-anchor="middle" fill="#173f35"><text x="295" y="300" font-size="35">Before photograph</text><text x="805" y="300" font-size="35">After photograph</text><text x="295" y="345" font-size="18">Example placeholder</text><text x="805" y="345" font-size="18">Example placeholder</text><text x="550" y="580" font-size="24">Evidence belongs alongside the student's written reflection.</text><text x="550" y="630" font-size="18">Demonstration only - no real client or student work shown.</text></g></svg>''')
print('Created example workbook and case-study evidence.')
