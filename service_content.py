"""Client-supplied salon copy, arranged for readable service pages."""

from html import escape
from urllib.parse import quote


SERVICES = [
    {
        'slug': 'cutting-styling',
        'title': 'Cutting & styling',
        'heading': 'A fresh shape.<br><em>A little more you.</em>',
        'summary': "A little tidy-up or a complete restyle. Find a look that feels right for your hair, your lifestyle and you.",
        'intro': "Whether you’re after a little tidy-up or a complete restyle, we’re here to help you find a look that feels right for you.",
        'sections': [
            ('Haircuts & restyling', [
                'We take the time to understand your hair, your lifestyle and your goals, offering friendly, personalised advice to help you get the most out of your hair.',
                'We can also tailor your hair care routine to your individual needs, helping you improve the condition of your hair and work towards healthier, happier locks.',
                'Your hair deserves a little love, and we’re here to guide you every step of the way.',
            ]),
        ],
        'closing': 'Ready for a fresh start?',
        'closing_text': 'Book now and let’s begin your journey to hair you’ll love!',
        'enquiry': 'Cutting & styling',
        'book': True,
    },
    {
        'slug': 'hair-colouring',
        'title': 'Colour & technical services',
        'heading': 'A perfect shade.<br><em>Perfectly you.</em>',
        'summary': 'A subtle refresh, a little extra brightness or a complete colour transformation, with personalised colour and thoughtful aftercare.',
        'intro': 'Whether you’re looking for a subtle refresh, a little extra brightness or a complete colour transformation, we’re here to help you find your perfect shade.',
        'sections': [
            ('Hair colouring', [
                'We believe the right hair colour should complement you, suit your lifestyle and leave you feeling confident. We’ll take the time to understand your ideas, talk through your options and create a personalised colour tailored to you and your hair’s needs.',
                'From beautiful, natural-looking tones to something a little bolder, we’ll help you achieve a colour you love while keeping the health and condition of your hair at the heart of everything we do.',
                'We’ll also guide you on the best aftercare to help maintain your colour and keep your hair looking and feeling its best.',
            ]),
            ('Before your colour appointment', [
                'Check consultation and patch-test requirements with Pippin before booking, especially if you are a new client or changing colour products. She’ll confirm the preparation and timing for your appointment.',
            ]),
        ],
        'closing': 'Ready for a little colour refresh?',
        'closing_text': 'Let’s find a shade that’s perfectly you.',
        'enquiry': 'Hair colouring',
        'book': True,
    },
    {
        'slug': 'blow-dries-styling',
        'title': 'Blow dries & occasion hair',
        'heading': 'Your moment.<br><em>Your kind of beautiful.</em>',
        'summary': 'Smooth finishes, bouncy volume and beautiful waves, plus personal bridal packages at your chosen wedding-day location.',
        'intro': 'Sometimes, all you need is a little pampering and that fresh-from-the-salon feeling!',
        'sections': [
            ('Blow dries & styling', [
                'Whether you’re after a smooth, sleek finish, bouncy volume or soft, beautiful waves, we’ll tailor your blow-dry to suit your style and leave you feeling fabulous.',
                'Perfect for a special occasion, a night out or simply treating yourself, our blow-dry services are all about helping you feel confident, refreshed and ready for whatever the day brings.',
                'We’ll also recommend the right products and techniques to help you recreate your look at home, so you can enjoy that salon-fresh feeling for longer.',
                'Fancy a little time for yourself? Let us take care of the styling while you sit back, relax and enjoy a little well-deserved pampering!',
            ]),
            ('Wedding hair & bridal packages', [
                'Your wedding day is filled with moments you’ll treasure forever, and we want you to feel beautiful, confident and completely yourself from the moment you start getting ready.',
                'We know how much thought goes into every little detail, and your hair is no exception. Whether you’ve always dreamed of soft, romantic waves, an elegant updo or something effortlessly natural, we’ll work closely with you to bring your vision to life.',
                'And the best part? We come to you! Enjoy the luxury of having your bridal hair styled in the comfort of your chosen wedding-day location, surrounded by your favourite people. A relaxed, personal experience lets you soak up every special moment.',
                'Our bridal packages can be tailored to you and your bridal party, making getting ready together part of the memories you’ll cherish just as much as the day itself.',
                'We want you to look back at your wedding photos and love not only how your hair looked, but how you felt wearing it. Beautifully looked after, confident and ready to walk down the aisle.',
                'Get in touch to discuss your wedding plans, explore our bridal packages and let us take care of your hair while you enjoy every moment.',
            ]),
        ],
        'closing': 'Let’s create something beautiful.',
        'closing_text': 'Book a blow-dry, or tell us about your big day to discuss a personal bridal package and availability.',
        'enquiry': 'Wedding hair',
        'book': True,
    },
    {
        'slug': 'hair-extensions',
        'title': 'Hair extensions',
        'heading': 'A little more length.<br><em>A world of possibility.</em>',
        'summary': 'Explore extra length, fullness and styling possibilities with carefully matched Nanos, Ultra Tips and Wefts, tailored to you.',
        'intro': 'From a little extra fullness to a whole new look, hair extensions open up possibilities for your hair and your confidence.',
        'sections': [
            ('Length, volume & a look you love', [
                'Extensions can add length and fullness without waiting for your natural hair to grow. Whether you’re looking for subtle volume or a more dramatic change, we’ll talk through the finish you have in mind.',
                'Extra length and density can make room for new styles, from updos and braids to curls and waves. Carefully chosen extension shades can also introduce highlights or a different colour effect without colouring your own hair.',
                'For a wedding, a holiday or another special occasion, extensions can help create the look you’ve imagined. The aim is a result that feels like you, with a natural-looking blend and a finish you enjoy wearing.',
            ]),
            ('A personal consultation', [
                'Pippin works with Nanos, Ultra Tips and Wefts, alongside professional extension removals. Your consultation considers your natural hair, desired result, lifestyle and budget before choosing an appropriate method.',
                'Colour, length, texture and placement are considered together. If your hair is thinning or fragile, we’ll discuss suitability first and whether a different approach, such as mesh integration, might be worth exploring.',
            ]),
            ('Looking after your extensions', [
                'Professional fitting, regular maintenance and the right home care all matter. We’ll explain the upkeep for your chosen method, including brushing, washing, styling and when to return for maintenance or removal.',
                'Your aftercare recommendations will suit both your natural hair and the extensions, helping you look after the result between appointments.',
            ]),
        ],
        'closing': 'Find your perfect match.',
        'closing_text': 'Start with a consultation to explore length, volume, colour and a method that works for you.',
        'enquiry': 'Hair extensions',
        'book': False,
    },
    {
        'slug': 'scalp-therapy',
        'title': 'Head Lab scalp therapy',
        'heading': 'Time for your scalp.<br><em>A fresh feeling.</em>',
        'summary': 'Personal scalp care with Malibu C Head Lab: gentle exfoliation, a refreshing cleanse and conditioning, guided by Pippin.',
        'intro': 'Give your scalp a little of the care you give your hair. Pippin’s Head Lab approach combines a personal consultation with professional scalp care.',
        'sections': [
            ('What is scalp therapy?', [
                'Malibu C Head Lab Scalp Scrub uses jojoba esters and activated charcoal to exfoliate and lift away product build-up, excess oil and dead skin cells.',
                'Tea tree, menthol and spearmint provide a refreshing, cooling sensation. The formula also includes cayenne extract, while shea butter and panthenol help condition and hydrate the scalp.',
            ]),
            ('A little reset for your routine', [
                'The focus is on cleansing away build-up, refreshing the scalp and supporting comfortable, well-conditioned skin. It’s a chance to slow down and enjoy some personal care, with advice to take home.',
                'As a trained Hair and Scalp Practitioner, Pippin takes time to understand your scalp, current products and routine, then explains which treatments and aftercare may suit you.',
            ]),
        ],
        'note': 'Scalp therapy is a cosmetic service. It does not diagnose or treat medical conditions or promise hair regrowth. Discuss any scalp concerns or sensitivities before booking.',
        'closing': 'Care starts with a conversation.',
        'closing_text': 'Ask Pippin about a Head Lab consultation and a scalp care routine tailored to you.',
        'enquiry': 'Scalp therapy',
        'book': False,
    },
    {
        'slug': 'mesh-integration',
        'title': 'Mesh integration',
        'heading': 'Your hair.<br><em>Your confidence.</em>',
        'summary': 'A personal, non-surgical approach to fuller-looking hair, with natural-looking coverage and a supportive consultation.',
        'intro': 'Hair loss and thinning can be a sensitive and personal journey, and we understand how much it can affect your confidence.',
        'sections': [
            ('What is hair mesh integration?', [
                'Hair mesh integration offers a non-surgical way to help you feel more comfortable and confident in your hair again.',
                'Using a lightweight mesh system, additional hair is carefully integrated with your existing hair to create the appearance of fuller volume and natural-looking coverage in areas where your hair may have become thinner.',
            ]),
            ('How does it work?', [
                'Every client’s hair is different, which is why we take the time to understand your needs. A mesh base is fitted to the area requiring additional coverage, with your natural hair incorporated into the system and blended with the added hair for a seamless finish.',
            ]),
            ('Who is it for?', [
                'Hair mesh integration may be suitable for people experiencing thinning hair, reduced density or certain types of hair loss who would love to achieve a fuller look without surgery.',
                'It’s designed to work with your existing hair, helping you enjoy a natural-looking result tailored to you. A consultation lets us assess suitability and explain fitting, maintenance and aftercare.',
            ]),
            ('Your hair, your confidence', [
                'We know that hair loss is about more than just hair — it’s about how you feel when you look in the mirror. Our goal is to provide a supportive, understanding experience where you feel listened to, never judged, and confident exploring your options.',
                'If you’re ready to discover whether hair mesh integration could be right for you, we’d love to welcome you for a consultation. Together, we can explore a solution that suits your hair, your lifestyle and your individual needs.',
            ]),
        ],
        'closing': 'Let’s explore your options.',
        'closing_text': 'A private, personal consultation is the first step towards a fuller look that feels right for you.',
        'enquiry': 'Mesh integration',
        'book': False,
    },
]


def paragraphs(items):
    return ''.join(f'<p>{escape(item)}</p>' for item in items)


def service_detail(service, button, link, book):
    title = escape(service['title'])
    hero = f'''<div class="wrap"><div class="page-hero service-hero"><div class="breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><a href="/salon.html">The salon</a><span aria-hidden="true">/</span><span>{title}</span></div><span class="eyebrow">{title}</span><h1>{service['heading']}</h1><p class="lead">{escape(service['intro'])}</p></div></div>'''
    sections = ''.join(f'<section class="service-chapter" id="'+('bridal' if heading.startswith('Wedding') else f'chapter-{i+1}')+f'"><h2>{escape(heading)}</h2>{paragraphs(copy)}</section>' for i, (heading, copy) in enumerate(service['sections']))
    if service.get('note'):
        sections += f'<p class="service-note">{escape(service["note"])}</p>'
    enquiry = '/contact.html?interest=' + quote(service['enquiry'])
    actions = button('Book an appointment', book, external=True) if service['book'] else ''
    actions += button('Enquire about bridal hair' if service['enquiry'] == 'Wedding hair' else 'Ask Pippin about this service', enquiry, 'outline')
    sections += f'<section class="service-ending"><span class="eyebrow">Your next step</span><h2>{escape(service["closing"])}</h2><p>{escape(service["closing_text"])}</p><div class="actions">{actions}</div></section>'
    nav = ''.join(f'<a href="/{item["slug"]}.html"'+(' aria-current="page"' if item['slug']==service['slug'] else '')+f'><span>0{i+1}</span>{escape(item["title"])}</a>' for i,item in enumerate(SERVICES))
    aside = f'<aside class="service-aside"><span class="eyebrow">Explore the salon</span><nav aria-label="Salon services">{nav}</nav><div class="service-aside-note"><h3>Care beyond the salon.</h3><p>Find a home routine that suits your hair, colour or extensions.</p>{link("Explore haircare advice", "/haircare.html")}</div></aside>'
    return hero + f'<section class="section pt-0"><div class="wrap service-page-grid"><article class="service-copy" aria-label="{title} details">{sections}</article>{aside}</div></section>'


def haircare_teaser(link):
    return f'''<section class="section" id="haircare"><div class="wrap haircare-teaser"><div><span class="eyebrow">The care continues at home</span><h2>Good hair days.<br><em>Beyond the salon.</em></h2><p class="lead">The right products, a little know-how and a routine that works for you.</p></div><div><p>From colour care and heat protection to looking after extensions, Pippin can help you choose professional products for your individual hair needs.</p><p>Discover her approach to home care and why GLOWWA is part of the conversation.</p>{link('Haircare & GLOWWA', '/haircare.html')}</div></div></section>'''


def haircare_content(button, link):
    benefits = [
        ('A formula that suits your hair', 'The best choice starts with your hair type, scalp, colour and styling routine. Pippin can explain which ingredients and formulas suit your needs, rather than choosing by price or a label alone.'),
        ('Care when you style', 'An appropriate heat protectant and considered styling technique help you look after your hair when using heated tools. Colour-care products can help maintain your finish between appointments.'),
        ('Moisture & scalp comfort', 'Choose cleansing, conditioning and treatment products that suit your scalp and the lengths of your hair. The aim is a balanced routine that leaves your hair comfortable and manageable.'),
        ('A finish you can enjoy', 'The right styling products can help with softness, shine, frizz control and hold. We’ll talk through how much to use and how to apply it, so you can recreate your finish at home.'),
        ('Make your products work for you', 'Using the recommended amount and choosing products you actually need can make your routine simpler. Professional advice helps you get the most from each step.'),
        ('Extra care for extensions & treated hair', 'Extensions, colour and other technical services need suitable aftercare. Follow the guidance for your particular method or treatment to look after the colour, bonds and finish.'),
    ]
    cards = ''.join(f'<article><span class="eyebrow">0{i+1}</span><h3>{escape(title)}</h3><p>{escape(body)}</p></article>' for i,(title,body) in enumerate(benefits))
    return f'''<section class="section pt-0"><div class="wrap"><div class="haircare-intro"><h2>Why do the right<br><em>products matter?</em></h2><p class="lead">Your home routine is part of caring for your cut, colour and extensions. Thoughtfully chosen products help you look after the result long after your appointment.</p></div><div class="care-grid">{cards}</div></div></section>
<section class="section soft" id="glowwa"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Recommended by Pippin</span><h2>Discover the<br><em>GLOWWA difference.</em></h2></div><p>Hair care includes the everyday choices you make, from your salon routine to a varied, balanced diet.</p></div><div class="glowwa-intro"><p>I only recommend products I believe in. GLOWWA is a brand I use and trust, and one I recommend as part of a personal conversation about your hair care.</p><span class="signature">Pippin x</span></div><p class="care-description">GLOWWA’s range includes daily hair supplements and collagen products. Pippin can talk you through the options, ingredients and manufacturer’s guidance, alongside the professional products you use on your hair.</p><div class="care-grid glowwa-grid"><article><span class="eyebrow">The original formula</span><h3>HAIR FOOD™</h3><p>A daily supplement containing nutrients including biotin, zinc and vitamin C, alongside MSM and amino acids. Biotin and zinc contribute to the maintenance of normal hair.</p></article><article><span class="eyebrow">A different life stage</span><h3>HAIR FOOD | MENO™</h3><p>A formula designed for women before, during and after menopause. Ask Pippin about the range and check the ingredients and manufacturer’s suitability guidance.</p></article><article><span class="eyebrow">Explore the range</span><h3>COLLAGEN</h3><p>GLOWWA also offers collagen supplements. Ask about the current options, ingredients and how they are intended to be used.</p></article></div><p class="service-note">Food supplements complement a varied, balanced diet and healthy lifestyle. Follow the product directions and seek advice from a qualified health professional if you are unsure about suitability, including during pregnancy or when taking medication.</p><div class="actions">{button('Ask Pippin about GLOWWA', '/contact.html?interest=Haircare%20%26%20GLOWWA')}{link('Explore the shop preview', '/shop.html')}</div></div></section>
<section class="section"><div class="wrap haircare-teaser"><div><span class="eyebrow">A routine that feels right</span><h2>A little guidance.<br><em>A personal approach.</em></h2></div><div><p>Pippin’s professional aftercare recommendations draw on brands including K18, Malibu C, Beauty Works, Remi Cachet, Olaplex, Wella, L’Oréal and COLOR WOW.</p><p>Bring your questions to your appointment, or get in touch to talk about products for your hair, scalp or extensions.</p>{button('Talk about your haircare', '/contact.html?interest=Haircare%20%26%20GLOWWA', 'outline')}</div></div></section>'''


def about_expertise(link):
    return f'''<section class="section soft"><div class="wrap"><div class="section-head"><div><span class="eyebrow">Experience, with a personal touch</span><h2>Always learning.<br><em>Always looking after you.</em></h2></div><p>Continued professional development and personal client care are at the heart of Pippin’s work.</p></div><div class="care-grid expertise-grid"><article><span class="eyebrow">Hair & confidence</span><h3>Extension specialist.</h3><p>Pippin works with Nanos, Ultra Tips and Wefts, alongside professional removals. Specialist training in mesh integration gives her another way to help clients explore fuller-looking hair.</p>{link('Explore hair extensions', '/hair-extensions.html')}</article><article><span class="eyebrow">Scalp care</span><h3>Hair & Scalp Practitioner.</h3><p>A trained and certified Hair and Scalp Practitioner, Pippin has completed specialist training with Malibu C Head Lab. She helps clients understand their hair and scalp needs and offers tailored cosmetic care.</p>{link('Discover scalp therapy', '/scalp-therapy.html')}</article><article><span class="eyebrow">Passing it on</span><h3>A passion for education.</h3><p>Pippin has achieved her Award in Education and Training (AET), building on her practical experience as she develops The Snippity Pip Training Academy.</p>{link('Step into the academy', '/academy.html')}</article></div><div class="about-aftercare"><p>Her care continues beyond the salon, with personalised aftercare advice and recommendations from professional brands including K18, Malibu C, Beauty Works, Remi Cachet, Olaplex, Wella, L’Oréal and COLOR WOW.</p>{link('Find your home haircare routine', '/haircare.html')}</div></div></section>'''
