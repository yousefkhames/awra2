/* Awra2 content. Every fact has a source id; sources are listed in SOURCES with date checked. */
(function (root) {
  var CHECKED = '2026-11-26';
  var SOURCES = {
    moiFaq: { t: { ar: 'وزارة الداخلية: الأسئلة الشائعة (الأحوال المدنية)', en: 'Ministry of Interior: civil status FAQ' }, url: 'https://cso.moi.gov.eg/questions', pub: '', official: true },
    kmIdNew: { t: { ar: 'مركز خدمات مصر: إصدار بطاقة رقم قومي أول مرة', en: 'Khadamat Misr: first national ID card' }, url: 'https://www.khadamatmisr.gov.eg/node/63', pub: '', official: true },
    kmIdRenew: { t: { ar: 'مركز خدمات مصر: تجديد بطاقة الرقم القومي', en: 'Khadamat Misr: national ID renewal' }, url: 'https://www.khadamatmisr.gov.eg/node/61', pub: '', official: true },
    masrawy: { t: { ar: 'مصراوي إف إم: رسوم الأحوال المدنية والبطاقة (عن الداخلية)', en: 'Masrawy FM: civil status and ID fees (citing the Interior Ministry)' }, url: 'https://www.masrawyfm.com/egypt/19782.html', pub: '2026-08-28' },
    passElbalad: { t: { ar: 'صدى البلد: استخراج جواز السفر 2026', en: 'Elbalad: getting a passport 2026' }, url: 'https://www.elbalad.news/7187817', pub: '2026-11-20' },
    passAlmasry: { t: { ar: 'المصري اليوم: رسوم جواز السفر (عن الجوازات)', en: 'Al-Masry Al-Youm: passport fees (citing the Passports Dept.)' }, url: 'https://www.almasryalyoum.com/news/details/4394556', pub: '2026-10-27' },
    passAlmasry2: { t: { ar: 'المصري اليوم: رسوم جواز السفر والمستندات', en: 'Al-Masry Al-Youm: passport fees and documents' }, url: 'https://www.almasryalyoum.com/news/details/4416648', pub: '2026-11-21' },
    passElwatan: { t: { ar: 'الوطن: تجديد جواز السفر أونلاين', en: 'Elwatan: renewing a passport online' }, url: 'https://www.elwatannews.com/news/details/8399891', pub: '2026-11-19' },
    passFolos: { t: { ar: 'الفلوس: تجديد جواز السفر 2026 ومدة الصلاحية', en: 'Elfolos: passport renewal 2026 and validity' }, url: 'https://elfolos.com/egyptian-passport-renewal-fees-2026/', pub: '2026-10-25' },
    licAhramFirst: { t: { ar: 'بوابة الأهرام: الرسوم والأوراق لرخصة القيادة لأول مرة', en: 'Al-Ahram Gate: first driving license papers and fees' }, url: 'https://gate.ahram.org.eg/News/5886593.aspx', pub: '2026-08-11' },
    licAhramRenew: { t: { ar: 'بوابة الأهرام: تجديد رخصة القيادة الخاصة', en: 'Al-Ahram Gate: renewing a private license' }, url: 'https://gate.ahram.org.eg/News/5811817.aspx', pub: '2026-07-16' },
    licAlex: { t: { ar: 'محافظة الإسكندرية: تجديد رخصة قيادة خاصة', en: 'Alexandria Governorate: private license renewal' }, url: 'http://www.alexandria.gov.eg/services/traffic5/traffic_services/license11.html', pub: '', official: true },
    licBiddex: { t: { ar: 'Biddex: تجديد رخصة القيادة (مصر الرقمية)', en: 'Biddex: license renewal (Digital Egypt)' }, url: 'https://biddex.com/ar/blog/article/renewing-a-private-driving-licence-in-egypt-documents-fees-and-online-renewal', pub: '2026-10-06' }
  };

  function T(ar, en) { return { ar: ar, en: en }; }

  var DOCS = {
    id: {
      icon: 'id',
      name: T('بطاقة الرقم القومي', 'National ID card'),
      blurb: T('أول مرة، تجديد، أو بدل فاقد وتالف', 'First card, renewal, or lost and damaged'),
      where: T('مكتب السجل المدني التابع لمحل إقامتك أو مركز الخدمات', 'Your civil registry office or a service center'),
      scenarios: {
        first: {
          title: T('أول مرة', 'First card'),
          steps: [
            T('جهّز شهادة ميلاد مختومة من جهة الدراسة، وحدّد ضامنًا من الأقارب حتى الدرجة الثالثة.', 'Get a birth certificate stamped by your school and pick a guarantor, a relative up to the third degree.'),
            T('اذهب إلى مكتب السجل المدني أو مركز الخدمات واطلب استمارة البطاقة.', 'Go to the civil registry office or a service center and ask for the ID application form.'),
            T('اختر سرعة الاستلام (عادي أو عاجل أو خاص) وادفع رسم الاستمارة.', 'Pick the speed (normal, urgent or special) and pay the form fee.'),
            T('سجّل بياناتك وبصماتك وصورتك أمام الموظف.', 'Have your data, fingerprints and photo taken at the counter.'),
            T('احتفظ بإيصال الطلب واستلم البطاقة في الموعد المحدد.', 'Keep the receipt and collect the card on the stated date.')
          ],
          papers: [
            { id: 'id1', t: T('شهادة ميلاد مختومة من جهة الدراسة (للطالب)', 'Birth certificate stamped by the school (student)'), s: 'kmIdNew' },
            { id: 'id2', t: T('الضامن: قريب حتى الدرجة الثالثة (يحضر معك ببطاقته)', 'Guarantor: relative up to the third degree (comes with you, with his or her ID)'), s: 'kmIdNew' }
          ],
          feeMode: 'options',
          fees: [
            { id: 'n', t: T('عادي، تسليم خلال 15 يومًا', 'Normal, delivered within 15 days'), a: 50, s: 'masrawy' },
            { id: 'u', t: T('عاجل، تسليم خلال 3 أيام', 'Urgent, delivered within 3 days'), a: 125, s: 'masrawy' },
            { id: 'x', t: T('خاص، تسليم خلال 24 ساعة', 'Special, delivered within 24 hours'), a: 175, s: 'masrawy' }
          ],
          notes: [T('الاستخراج عبر الإنترنت لا يتاح لمواطن خارج مصر.', 'Online issuing is not available to a citizen who is outside Egypt.')],
          src: ['kmIdNew', 'masrawy', 'moiFaq']
        },
        renew: {
          title: T('تجديد', 'Renewal'),
          steps: [
            T('تأكد من تاريخ انتهاء بطاقتك الحالية.', 'Check the expiry date on your current card.'),
            T('جهّز البطاقة القديمة، وقسيمة الزواج إن تغيّرت حالتك الاجتماعية.', 'Bring the old card, plus the marriage certificate if your marital status changed.'),
            T('قدّم الطلب في السجل المدني أو مركز الخدمات، أو من بوابة خدمات الأحوال المدنية.', 'Apply at the civil registry office or a service center, or on the civil status e-services portal.'),
            T('اختر السرعة وادفع الرسم.', 'Choose the speed and pay the fee.'),
            T('استلم البطاقة الجديدة، أو بالتوصيل مقابل رسم إضافي إن اخترت الخدمة الإلكترونية.', 'Collect the new card, or have it delivered for an extra fee if you used the e-service.')
          ],
          papers: [
            { id: 'id3', t: T('بطاقة الرقم القومي القديمة', 'Your old national ID card'), s: 'kmIdRenew' },
            { id: 'id4', t: T('قسيمة الزواج (في حالة الزواج)', 'Marriage certificate (if married)'), s: 'kmIdRenew', c: 'married' }
          ],
          feeMode: 'options',
          fees: [
            { id: 'n', t: T('عادي، تسليم خلال 15 يومًا', 'Normal, delivered within 15 days'), a: 50, s: 'masrawy' },
            { id: 'u', t: T('عاجل، تسليم خلال 3 أيام', 'Urgent, delivered within 3 days'), a: 125, s: 'masrawy' },
            { id: 'x', t: T('خاص، تسليم خلال 24 ساعة', 'Special, delivered within 24 hours'), a: 175, s: 'masrawy' },
            { id: 'e', t: T('تجديد إلكتروني (بدون رسوم التوصيل)', 'E-renewal (delivery fee not included)'), a: 175, s: 'masrawy' }
          ],
          notes: [T('قد تُفرض غرامة عند التأخر في التجديد. لم نجد رقمًا موثوقًا لها، اسأل المكتب.', 'A late-renewal fine may apply. We found no reliable figure, ask the office.')],
          src: ['kmIdRenew', 'masrawy', 'moiFaq']
        },
        lost: {
          title: T('بدل فاقد / تالف', 'Lost / damaged'),
          steps: [
            T('اطلب خدمة بدل فاقد أو بدل تالف من مكتب السجل المدني أو من الخدمات الإلكترونية.', 'Ask for the lost or damaged replacement at the civil registry office or in the e-services.'),
            T('اسأل المكتب عن المستندات المطلوبة لحالتك قبل الذهاب.', 'Ask the office which papers your case needs before you go.'),
            T('ادفع الرسم واستلم إيصال الطلب.', 'Pay the fee and keep the receipt.')
          ],
          papers: [
            { id: 'id5', t: T('المستندات: لم نتحقق منها من مصدر موثوق، اتصل بالمكتب أو اطلع على الخدمة الرسمية', 'Papers: not verified from a reliable source here, call the office or check the official service'), s: 'moiFaq', unverified: true }
          ],
          feeMode: 'none',
          fees: [],
          notes: [T('رسم البدل غير مؤكد هنا. تفاوتت الأرقام المنشورة، لذلك لم نذكر رقمًا.', 'The replacement fee is not confirmed here. Published figures differed, so we give none.')],
          src: ['moiFaq']
        }
      }
    },

    passport: {
      icon: 'passport',
      name: T('جواز السفر', 'Passport'),
      blurb: T('أول مرة، تجديد، أو بدل فاقد وتالف', 'First passport, renewal, or lost and damaged'),
      where: T('مكتب الجوازات التابع لمحل إقامتك، أو الخدمة الإلكترونية', 'Your passport office, or the online service'),
      scenarios: {
        first: {
          title: T('أول مرة', 'First passport'),
          steps: [
            T('اذهب إلى مكتب الجوازات التابع لمحل إقامتك.', 'Go to the passport office for your area of residence.'),
            T('احصل على نموذج رقم 92 واملأ بياناتك بدقة.', 'Get form no. 92 and fill it in accurately.'),
            T('قدّم المستندات الرسمية المطلوبة.', 'Hand in the required official documents.'),
            T('ادفع الرسم حسب السرعة التي اخترتها.', 'Pay the fee for the speed you chose.'),
            T('احتفظ بإيصال السداد واستلم الجواز في الموعد.', 'Keep the payment receipt and collect the passport on the date.')
          ],
          papers: [
            { id: 'p1', t: T('بطاقة رقم قومي سارية (لمن بلغ 16 عامًا)', 'Valid national ID (age 16 and over)'), s: 'passElbalad', c: '!minor' },
            { id: 'p2', t: T('شهادة ميلاد مميكنة (لمن هم أقل من 16 عامًا)، ويحضر ولي الأمر', 'Computerized birth certificate (under 16), parent or guardian attends'), s: 'passElbalad', c: 'minor' },
            { id: 'p3', t: T('4 صور شخصية حديثة 4×6 بخلفية بيضاء (اطلب 4 لتغطي أكبر عدد منشور)', '4 recent 4x6 photos on a white background (bring 4, the highest number reported)'), s: 'passElbalad' },
            { id: 'p4', t: T('مستند الموقف من التجنيد (للذكور)', 'Military service status document (males)'), s: 'passElbalad', c: 'male' },
            { id: 'p5', t: T('مستند المؤهل الدراسي، إن لم يكن مثبتًا في البطاقة', 'Education certificate, if it is not recorded on the ID'), s: 'passElbalad', c: 'noqual' },
            { id: 'p6', t: T('وثيقة الزواج لإثبات اسم الزوج أو الزوجة', 'Marriage document, to record the spouse name'), s: 'passElbalad', c: 'married' }
          ],
          feeMode: 'options',
          fees: [
            { id: 'n', t: T('عادي، تسليم بعد 3 أيام عمل', 'Normal, 3 working days'), a: 1110, s: 'passElbalad' },
            { id: 'u', t: T('مستعجل، خلال يومي عمل', 'Urgent, within 2 working days'), a: 1300, s: 'passElbalad' },
            { id: 'x', t: T('فوري، في نفس اليوم', 'Immediate, same day'), a: 1600, s: 'passElbalad' }
          ],
          notes: [
            T('الرسم الأساسي للجواز المميكن 705 جنيهًا، وتُضاف إليه رسوم الخدمة.', 'The base fee for the mechanized passport is EGP 705, with service fees added on top.'),
            T('تقرير بتاريخ 21 نوفمبر 2026 ذكر نطاقًا مختلفًا (من 900 إلى 2950). الأرقام أعلاه هي الأكثر تكرارًا في المصادر، فتأكد عند التقديم.', 'A report dated 21 Nov 2026 gave a different range (900 to 2950). The figures above are the ones most sources repeat, so confirm when you apply.')
          ],
          src: ['passElbalad', 'passAlmasry', 'passAlmasry2']
        },
        renew: {
          title: T('تجديد', 'Renewal'),
          steps: [
            T('جدّد بطاقة الرقم القومي أولًا إن كانت منتهية، حتى تحصل على جواز لمدة 7 سنوات.', 'Renew your national ID first if it has expired, so you get a 7-year passport.'),
            T('يمكنك التقديم في مكتب الجوازات، أو إلكترونيًا: أنشئ حساب على موقع الجوازات.', 'Apply at the passport office, or online: create an account on the passports website.'),
            T('أدخل الرقم القومي وارفع صورة البطاقة وصورة شخصية حديثة 4×6 بخلفية بيضاء.', 'Enter your national number and upload your ID and a recent 4x6 white-background photo.'),
            T('ارفع موقف التجنيد (للذكور) ووثيقة الزواج إن لزم.', 'Upload military status (males) and the marriage document if needed.'),
            T('ادفع الرسوم إلكترونيًا أو في المكتب، وحدد موعد الاستلام.', 'Pay online or at the office and choose the pickup date.')
          ],
          papers: [
            { id: 'p7', t: T('الجواز القديم', 'Your old passport'), s: 'passFolos' },
            { id: 'p8', t: T('بطاقة رقم قومي سارية وصورة منها', 'Valid national ID and a copy'), s: 'passElwatan' },
            { id: 'p9', t: T('4 صور شخصية حديثة 4×6 بخلفية بيضاء', '4 recent 4x6 photos on a white background'), s: 'passElwatan' },
            { id: 'p10', t: T('مستند الموقف من التجنيد (للذكور)', 'Military service status document (males)'), s: 'passElwatan', c: 'male' },
            { id: 'p11', t: T('شهادة المؤهل إن لم تكن مسجلة في البطاقة', 'Education certificate if not recorded on the ID'), s: 'passElwatan', c: 'noqual' },
            { id: 'p12', t: T('وثيقة الزواج إن لم يكن اسم الزوج في الجواز', 'Marriage document if the spouse name is not in the passport'), s: 'passElwatan', c: 'married' }
          ],
          feeMode: 'options',
          fees: [
            { id: 'n', t: T('عادي', 'Normal'), a: 1110, s: 'passFolos' },
            { id: 'u', t: T('مستعجل (يومان)', 'Urgent (2 days)'), a: 1300, s: 'passFolos' },
            { id: 'x', t: T('فوري (نفس اليوم)', 'Immediate (same day)'), a: 1600, s: 'passFolos' }
          ],
          notes: [
            T('الصلاحية 7 سنوات عادةً. إن انتهت بطاقتك منذ أكثر من 3 أشهر، أو قدمت شهادة ميلاد بدلها، يصدر الجواز لمدة 3 سنوات فقط.', 'Validity is normally 7 years. If your ID expired more than 3 months ago, or you use a birth certificate instead, the passport is issued for 3 years only.')
          ],
          src: ['passFolos', 'passElwatan', 'passAlmasry']
        },
        lost: {
          title: T('بدل فاقد / تالف', 'Lost / damaged'),
          steps: [
            T('اذهب إلى مكتب الجوازات التابع لك واطلب جواز بدل فاقد أو تالف.', 'Go to your passport office and ask for a lost or damaged replacement.'),
            T('أحضر بطاقتك والصور المطلوبة، واسأل المكتب عن إجراءات الفقد في حالتك.', 'Bring your ID and the photos, and ask the office about the loss procedure for your case.'),
            T('ادفع رسم البدل واحتفظ بالإيصال.', 'Pay the replacement fee and keep the receipt.'),
            T('قد يستغرق الإصدار وقتًا أطول من المعتاد بسبب فحص الحالة.', 'Issuing may take longer than usual because the case is checked.')
          ],
          papers: [
            { id: 'p13', t: T('بطاقة رقم قومي سارية', 'Valid national ID'), s: 'passElwatan' },
            { id: 'p14', t: T('4 صور شخصية حديثة 4×6 بخلفية بيضاء', '4 recent 4x6 photos on a white background'), s: 'passElwatan' },
            { id: 'p15', t: T('الجواز التالف (في حالة التلف)', 'The damaged passport (if damaged)'), s: 'passFolos', unverified: true },
            { id: 'p16', t: T('مستندات الفقد الإضافية: اسأل المكتب، لم نتحقق منها', 'Extra loss documents: ask the office, not verified here'), s: 'passFolos', unverified: true }
          ],
          feeMode: 'options',
          fees: [
            { id: 'l', t: T('رسم طلب جواز بدل فاقد أو تالف', 'Replacement fee, lost or damaged'), a: 1155, s: 'passAlmasry' }
          ],
          notes: [T('الرقم 1155 جنيهًا منقول عن وزارة الداخلية في صحيفة المصري اليوم (27 أكتوبر 2026).', 'The EGP 1,155 figure is relayed from the Interior Ministry by Al-Masry Al-Youm (27 Oct 2026).')],
          src: ['passAlmasry', 'passElwatan', 'passFolos']
        }
      }
    },

    license: {
      icon: 'license',
      name: T('رخصة القيادة', 'Driving license'),
      blurb: T('خاصة لأول مرة، تجديد، أو بدل فاقد وتالف', 'Private license: first time, renewal, or lost and damaged'),
      where: T('وحدة المرور التابعة لمحل الإقامة المدون في البطاقة', 'The traffic unit for the address written on your ID'),
      scenarios: {
        first: {
          title: T('أول مرة (خاصة)', 'First private license'),
          steps: [
            T('اذهب إلى وحدة المرور التابعة لمحل الإقامة المدون في بطاقتك.', 'Go to the traffic unit for the address on your ID.'),
            T('اشترِ نموذج (256) لطلب الرخصة.', 'Buy form 256, the license application.'),
            T('قدّم صورة البطاقة وصورة شهادة التخرج مع الأصول للاطلاع، و4 صور شخصية.', 'Submit copies of your ID and graduation certificate (originals shown) plus 4 photos.'),
            T('اعمل الكشفين الطبيين (باطنة وعيون) وفصيلة الدم داخل وحدة المرور.', 'Do the two medical exams (internal and eyes) and the blood group test inside the traffic unit.'),
            T('اجتز دورة القيادة في مركز التعليم المروري وتحليل المخدرات من جهة معتمدة قبل الاستلام.', 'Pass the driving course at the traffic education center and a drug test from an approved lab before collecting.'),
            T('اجتز اختبار الإشارات والاختبار العملي، وادفع الرسوم، ثم استلم الرخصة.', 'Pass the signs test and the practical test, pay the fees, then collect the license.')
          ],
          papers: [
            { id: 'l1', t: T('بطاقة رقم قومي سارية: صورة مع الأصل للاطلاع', 'Valid national ID: a copy, original shown'), s: 'licAhramFirst' },
            { id: 'l2', t: T('شهادة التخرج: صورة مع الأصل للاطلاع', 'Graduation certificate: a copy, original shown'), s: 'licAhramFirst' },
            { id: 'l3', t: T('نموذج (256) طلب الرخصة', 'Form 256, license application'), s: 'licAhramFirst' },
            { id: 'l4', t: T('4 صور شخصية حديثة مقاس 4×6', '4 recent 4x6 photos'), s: 'licAhramFirst' },
            { id: 'l5', t: T('شهادتان طبيتان (باطنة وعيون) وفصيلة الدم: تُجرى في وحدة المرور', 'Two medical certificates (internal, eyes) and blood group: done at the traffic unit'), s: 'licAhramFirst' },
            { id: 'l6', t: T('تحليل مخدرات من جهة معتمدة (قبل الاستلام)', 'Drug test from an approved body (before collecting)'), s: 'licAhramFirst' },
            { id: 'l7', t: T('شهادة اجتياز دورة القيادة بمركز التعليم المروري', 'Driving course completion at the traffic education center'), s: 'licAhramFirst' }
          ],
          feeMode: 'itemized',
          fees: [
            { id: 'm', t: T('الكشف الطبي وفصيلة الدم', 'Medical exam and blood group'), a: 285, s: 'licAhramFirst' },
            { id: 't', t: T('الضريبة (شاملة التأمين وتنمية موارد الدولة)', 'Tax (includes insurance and state resources fee)'), a: 615, s: 'licAhramFirst' },
            { id: 'f', t: T('نموذج (256) لطلب الرخصة', 'Form 256'), a: 6.5, s: 'licAhramFirst' },
            { id: 's', t: T('نموذج اختبار الإشارات', 'Signs test form'), a: 10, s: 'licAhramFirst' },
            { id: 'h', t: T('ملف وحافظة الرخصة', 'License file and holder'), a: 35, s: 'licAhramFirst' },
            { id: 'p', t: T('طابع شرطة', 'Police stamp'), a: 15, s: 'licAhramFirst' },
            { id: 'd', t: T('استمارة بيانات', 'Data form'), a: 105, s: 'licAhramFirst' }
          ],
          notes: [
            T('السن لا يقل عن 18 عامًا، ويُشترط ألا يكون المتقدم صادرًا ضده حكم جنائي أو جنحة مخلة بالشرف والأمانة.', 'Minimum age is 18, and you must not have a criminal ruling or a misdemeanor involving honor or honesty.'),
            T('المجموع لا يشمل رسوم دورة القيادة ولا تحليل المخدرات.', 'The total does not include the driving course or the drug test.')
          ],
          src: ['licAhramFirst']
        },
        renew: {
          title: T('تجديد (خاصة)', 'Renewal (private)'),
          steps: [
            T('اذهب إلى وحدة المرور التابعة لمحل الإقامة في البطاقة.', 'Go to the traffic unit for the address on your ID.'),
            T('املأ نموذج التجديد وقدّم صورة البطاقة (الأصل للاطلاع).', 'Fill in the renewal form and give a copy of your ID (original shown).'),
            T('احصل على شهادة براءة الذمة (المخالفات).', 'Get the clearance certificate (no unpaid violations).'),
            T('اعمل الكشف الطبي: باطنة وعيون.', 'Do the medical exam: internal and eyes.'),
            T('سدد الرسوم المقررة واستلم الرخصة.', 'Pay the set fees and collect the license.')
          ],
          papers: [
            { id: 'l8', t: T('رخصة القيادة المنتهية (الأصل)', 'Your expired license (original)'), s: 'licAhramRenew' },
            { id: 'l9', t: T('بطاقة الرقم القومي: صورة مع الأصل', 'National ID: a copy, original shown'), s: 'licAlex' },
            { id: 'l10', t: T('شهادتان طبيتان (باطني وعيون)', 'Two medical certificates (internal, eyes)'), s: 'licAlex' },
            { id: 'l11', t: T('شهادة براءة الذمة (المخالفات)', 'Clearance certificate (violations)'), s: 'licAlex' },
            { id: 'l12', t: T('صور شخصية حديثة: 3 أو 4 حسب المصدر، أحضر 4', 'Recent photos: 3 or 4 depending on the source, bring 4'), s: 'licAhramRenew' },
            { id: 'l13', t: T('صورة من شهادة التخرج', 'Copy of graduation certificate'), s: 'licAhramRenew' }
          ],
          feeMode: 'none',
          fees: [],
          notes: [
            T('لم نجد جدول رسوم موثوقًا للتجديد، فلا نذكر رقمًا. اسأل وحدة المرور.', 'We found no reliable renewal fee table, so we give no figure. Ask the traffic unit.'),
            T('خدمة تجديد رخصة المركبة على مصر الرقمية شيء آخر، وهي ليست تجديد رخصة القيادة.', 'The vehicle license renewal on Digital Egypt is a different thing from renewing a driving license.')
          ],
          src: ['licAhramRenew', 'licAlex', 'licBiddex']
        },
        lost: {
          title: T('بدل فاقد / تالف', 'Lost / damaged'),
          steps: [
            T('تعرض مصر الرقمية خدمة بدل فاقد وبدل تالف لرخص القيادة.', 'Digital Egypt lists lost and damaged replacement for driving licenses.'),
            T('اسأل وحدة المرور عن المستندات المطلوبة لحالتك قبل الذهاب.', 'Ask the traffic unit which papers your case needs before you go.'),
            T('ادفع الرسم واستلم الإيصال.', 'Pay the fee and keep the receipt.')
          ],
          papers: [
            { id: 'l14', t: T('المستندات والرسم: لم نتحقق منها من مصدر موثوق، اسأل وحدة المرور', 'Papers and fee: not verified from a reliable source here, ask the traffic unit'), s: 'licBiddex', unverified: true }
          ],
          feeMode: 'none',
          fees: [],
          notes: [T('لا نذكر رقمًا للرسم لأننا لم نتأكد منه.', 'We give no fee figure because we could not confirm it.')],
          src: ['licBiddex']
        }
      }
    }
  };

  var api = { SOURCES: SOURCES, DOCS: DOCS, CHECKED: CHECKED };

  // pure helpers (tested)
  api.visiblePapers = function (scen, flags) {
    flags = flags || {};
    return scen.papers.filter(function (p) {
      if (!p.c) return true;
      if (p.c.charAt(0) === '!') return !flags[p.c.slice(1)];
      return !!flags[p.c];
    });
  };
  api.feeTotal = function (scen, choice) {
    if (scen.feeMode === 'itemized') return scen.fees.reduce(function (s, f) { return s + f.a; }, 0);
    if (scen.feeMode === 'options') {
      var f = scen.fees.filter(function (x) { return x.id === choice; })[0] || scen.fees[0];
      return f ? f.a : null;
    }
    return null;
  };
  api.daysLeft = function (iso, today) {
    if (!iso) return null;
    var a = Date.UTC.apply(null, iso.split('-').map(function (n, i) { return i === 1 ? n - 1 : +n; }));
    var t = today || new Date();
    var b = Date.UTC(t.getFullYear(), t.getMonth(), t.getDate());
    return Math.round((a - b) / 86400000);
  };
  api.status = function (d) {
    if (d === null) return 'none';
    if (d < 0) return 'expired';
    if (d <= 90) return 'soon';
    return 'ok';
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.AwraData = api;
})(typeof window !== 'undefined' ? window : this);
