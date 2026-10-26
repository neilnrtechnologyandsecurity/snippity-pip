from html import escape
LINKS=[('Book your appointment','Choose your hair service and find a time that suits you.','https://bookings.gettimely.com/thesnippitypip/bb/book'),('A little gift of confidence','Treat someone to a Snippitypip gift voucher.','https://bookings.gettimely.com/thesnippitypip/bb/purchase?giftVoucherId=402852'),('View your appointment','Find the details of your upcoming visit.','https://bookings.gettimely.com/thesnippitypip/'),('Your personal details','Keep your customer contact information up to date.','https://bookings.gettimely.com/thesnippitypip/details/update')]
def customer_links():
    cards=''.join(f'<a class="customer-card" href="{escape(url,quote=True)}" target="_blank" rel="noopener noreferrer"><span class="eyebrow">0{i+1} / Hair customers</span><h3>{title}</h3><p>{body}</p><span class="text-link">Open in Timely <img class="action-sunflower" src="/assets/sunflower.svg" width="18" height="18" alt="" aria-hidden="true"></span></a>' for i,(title,body,url) in enumerate(LINKS))
    return '<section class="section soft" id="customer-links"><div class="wrap"><span class="eyebrow">Your salon, a little closer</span><h2>Everything for<br><em>your next visit.</em></h2><p class="lead">Book a little time for yourself, send a thoughtful gift or manage your appointment.</p><div class="customer-grid">'+cards+'</div><p class="small muted">For hairdressing customers. These links open our Timely booking service in a new tab.</p><a class="text-link" href="https://thesnippitypip.gettimely.com/" target="_blank" rel="noopener noreferrer">Visit our Timely booking page <img class="action-sunflower" src="/assets/sunflower.svg" width="18" height="18" alt="" aria-hidden="true"></a></div></section>'
SALON_REVIEWS = [
    {
        'service': 'Mesh integration',
        'quote': 'Having the hair integration system done has completely transformed not just my hair, but my confidence too.',
        'more': [
            'For such a long time, my naturally thin hair really affected how I felt about myself. It knocked my confidence more than I probably let on — I was constantly worrying about how it looked, trying to style it to hide the thinning, and never quite feeling like me. It’s something that sits with you every day.',
            'What made this even more special is that it was done by my best friend, so there was already so much trust there — Kate went above and beyond anything I could have imagined. From the very beginning, she was so patient, so understanding, and really listened to exactly what I wanted.',
            'The attention to detail was unreal. She took so much time to make sure everything was perfect, and the end result is so natural and seamless — it genuinely feels like my own hair. I’ve had so many compliments, and people can’t even tell it’s an integration system unless I tell them.',
            "But the biggest thing for me is how I feel now. I feel more like myself again, more confident, and honestly just happier when I look in the mirror, I wear my hair down which I haven't done in years",
            'I feel so lucky to have experienced this firsthand. I couldn’t recommend Kate enough to anyone considering it — it’s truly been life-changing.',
        ],
    },
    {
        'service': 'Cutting & styling',
        'quote': 'Thanks so much for hair cuts yesterday — absolutely amazing at your job.',
        'more': [],
    },
    {
        'service': 'Mesh integration',
        'quote': 'On a personal note Pip made me feel at ease, no judgement just good sound advice and a few laughs through every appointment.',
        'more': [
            'I have been looking for options for hair loss for a long time. Pip told me about mesh integration and it seemed like a really good option. She did not disappoint!',
            'From the colour matching to the fitting Pip talked me through it all.',
            'Like anything there was some maintenance to keep the hair looking good but Pip was on hand to talk me through all that as well. Gym classes, swimming all became the norm again for me thanks to Pip.',
            'I can honestly say Pip and my mesh have been life changing for me and would definitely recommend.',
        ],
    },
]


def salon_testimonials():
    cards = []
    for i, review in enumerate(SALON_REVIEWS):
        more = ''
        if review['more']:
            paragraphs = ''.join(f'<p>{escape(paragraph)}</p>' for paragraph in review['more'])
            more = f'<details class="review-more"><summary><span class="review-read">Read more</span><span class="review-close">Show less</span><span class="sr-only"> of salon review {i+1}</span></summary><blockquote class="review-continuation">{paragraphs}</blockquote></details>'
        cards.append(f'<article class="review-card" aria-label="Salon review {i+1}: {escape(review["service"])}"><span class="eyebrow">{escape(review["service"])}</span><span class="review-mark" aria-hidden="true">“</span><blockquote><p>{escape(review["quote"])}</p></blockquote><p class="review-credit">A salon client</p>{more}</article>')
    return '<section class="section testimonials" id="testimonials" aria-labelledby="salon-reviews-title"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Hairdressing testimonials</span><h2 id="salon-reviews-title">Lovely hair.<br><em>Lovely words.</em></h2></div><p>Personal experiences, shared by the people who sit in Pippin’s chair.</p></div><div class="salon-reviews">'+''.join(cards)+'</div><p class="review-note">Excerpts from client messages, shared without names.</p></div></section>'


def testimonials(academy=False):
    if not academy:
        return salon_testimonials()
    kind='learner' if academy else 'client'
    title='Stories of learning.<br><em>Confidence for what’s next.</em>' if academy else 'Lovely hair.<br><em>Lovely words.</em>'
    return f'<section class="section testimonials" id="testimonials"><div class="wrap testimonial-layout"><div><span class="eyebrow">{ "Academy testimonials" if academy else "Hairdressing testimonials" }</span><h2>{title}</h2><p class="lead">{ "A space for our learners to share their academy experience." if academy else "A space for our clients to share their time in the salon." }</p></div><div class="testimonial-placeholder"><span class="testimonial-mark" aria-hidden="true">“</span><span class="eyebrow">Your stories, coming soon</span><h3>Kind words belong here.</h3><p>We’re making room for genuine {kind} feedback. Testimonials will appear here once they’re ready to share.</p><span class="testimonial-note">Testimonial area · awaiting approved reviews</span></div></div></section>'
