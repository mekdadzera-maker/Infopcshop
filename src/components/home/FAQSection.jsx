import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useLang } from '@/lib/i18n';

const faqData = [
  {
    question: {
      fr: 'Quels sont les délais de livraison ?',
      ar: 'ما هي أوقات التسليم؟',
      en: 'What are the delivery times?',
    },
    answer: {
      fr: 'La livraison prend entre 1 et 5 jours ouvrés selon votre wilaya. Les commandes validées avant 12h sont expédiées le jour même.',
      ar: 'يستغرق التسليم من 1 إلى 5 أيام عمل حسب ولايتك. يتم شحن الطلبات المؤكدة قبل الساعة 12 ظهرًا في نفس اليوم.',
      en: 'Delivery takes between 1 and 5 business days depending on your wilaya. Orders confirmed before 12pm are shipped the same day.',
    },
  },
  {
    question: {
      fr: 'Quels moyens de paiement acceptez-vous ?',
      ar: 'ما هي طرق الدفع المقبولة؟',
      en: 'What payment methods do you accept?',
    },
    answer: {
      fr: 'Nous acceptons le paiement à la livraison pour la plupart des wilayas, ainsi que le virement bancaire CCP.',
      ar: 'نقبل الدفع عند الاستلام في معظم الولايات، بالإضافة إلى التحويل البنكي CCP.',
      en: 'We accept cash on delivery for most wilayas, as well as CCP bank transfers.',
    },
  },
  {
    question: {
      fr: 'Offrez-vous une garantie sur vos produits ?',
      ar: 'هل تقدمون ضمانًا على منتجاتكم؟',
      en: 'Do you offer a warranty on your products?',
    },
    answer: {
      fr: 'Oui, tous nos produits bénéficient d\'une garantie constructeur d\'au moins 1 an. Certains composants sont garantis jusqu\'à 3 ans.',
      ar: 'نعم، جميع منتجاتنا تأتي مع ضمان المصنع لمدة سنة على الأقل. بعض المكونات مضمونة لمدة تصل إلى 3 سنوات.',
      en: 'Yes, all our products come with a manufacturer\'s warranty of at least 1 year. Some components are warranted up to 3 years.',
    },
  },
  {
    question: {
      fr: 'Puis-je retourner un produit ?',
      ar: 'هل يمكنني إرجاع منتج؟',
      en: 'Can I return a product?',
    },
    answer: {
      fr: 'Vous disposez de 7 jours après réception pour retourner un produit non ouvert dans son emballage d\'origine.',
      ar: 'لديك 7 أيام بعد الاستلام لإرجاع منتج غير مفتوح في عبوته الأصلية.',
      en: 'You have 7 days after receiving your order to return an unopened product in its original packaging.',
    },
  },
  {
    question: {
      fr: 'Proposez-vous un service de montage PC ?',
      ar: 'هل تقدمون خدمة تجميع الحاسوب؟',
      en: 'Do you offer PC assembly services?',
    },
    answer: {
      fr: 'Oui, nous proposons un service de montage et d\'installation de votre configuration sur mesure dans notre magasin.',
      ar: 'نعم، نقدم خدمة تجميع وتثبيت الإعداد المخصص لكم في متجرنا.',
      en: 'Yes, we offer custom PC assembly and setup services in our store.',
    },
  },
];

export default function FAQSection() {
  const { lang, t } = useLang();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-10">
        {t.faq.title}
      </h2>

      <div className="space-y-3">
        {faqData.map((item, i) => (
          <div
            key={i}
            className={`rounded-xl border transition-all ${
              openIndex === i ? 'border-primary bg-primary/5' : 'border-border bg-card'
            }`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className={`font-semibold text-sm md:text-base ${openIndex === i ? 'text-primary' : ''}`}>
                {item.question[lang] || item.question.fr}
              </span>
              {openIndex === i ? (
                <Minus className="w-4 h-4 text-primary flex-shrink-0 ml-3" />
              ) : (
                <Plus className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                {item.answer[lang] || item.answer.fr}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}