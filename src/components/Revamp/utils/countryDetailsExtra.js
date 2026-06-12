import reason1 from "../../../Images/rev/reasons/reason1.svg";
import reason2 from "../../../Images/rev/reasons/reason2.svg";
import reason3 from "../../../Images/rev/reasons/reason3.svg";
import reason4 from "../../../Images/rev/reasons/reason4.svg";
import reason5 from "../../../Images/rev/reasons/reason5.svg";
import reason6 from "../../../Images/rev/reasons/reason6.svg";
import reason7 from "../../../Images/rev/reasons/reason7.svg";
import reason8 from "../../../Images/rev/reasons/reason8.svg";
import reason9 from "../../../Images/rev/reasons/reason9.svg";

import NewZealand from "../../../Images/rev/flags/map/new-zealand_map.svg";
import Cyprus from "../../../Images/rev/flags/map/cyprus_map.svg";
import Denmark from "../../../Images/rev/flags/map/denmark_map.svg";
import France from "../../../Images/rev/flags/map/france_map.svg";
import Italy from "../../../Images/rev/flags/map/italy_map.svg";
import Finland from "../../../Images/rev/flags/map/finland_map.svg";
import Latvia from "../../../Images/rev/flags/map/latvia_map.svg";
import Malta from "../../../Images/rev/flags/map/malta_map.svg";
import Norway from "../../../Images/rev/flags/map/norway_map.svg";
import Poland from "../../../Images/rev/flags/map/poland_map.svg";
import Singapore from "../../../Images/rev/flags/map/singapore_map.svg";
import Spain from "../../../Images/rev/flags/map/spain_map.svg";

import uk1 from "../../../Images/rev/university/uk/uk1.svg";
import uk2 from "../../../Images/rev/university/uk/uk2.svg";
import uk3 from "../../../Images/rev/university/uk/uk3.svg";
import uk4 from "../../../Images/rev/university/uk/uk4.svg";
import uk5 from "../../../Images/rev/university/uk/uk5.svg";
import uk6 from "../../../Images/rev/university/uk/uk6.svg";
import uk7 from "../../../Images/rev/university/uk/uk7.svg";
import uk8 from "../../../Images/rev/university/uk/uk8.svg";
import uk9 from "../../../Images/rev/university/uk/uk9.svg";

const defaultUniLogos = [
  { name: "Partner", icon: uk1, detail: "Partner University" },
  { name: "Partner", icon: uk2, detail: "Partner University" },
  { name: "Partner", icon: uk3, detail: "Partner University" },
  { name: "Partner", icon: uk4, detail: "Partner University" },
  { name: "Partner", icon: uk5, detail: "Partner University" },
  { name: "Partner", icon: uk6, detail: "Partner University" },
  { name: "Partner", icon: uk7, detail: "Partner University" },
  { name: "Partner", icon: uk8, detail: "Partner University" },
  { name: "Partner", icon: uk9, detail: "Partner University" },
];

const buildReasons = (items) =>
  items.map((item, index) => ({
    icon: [reason1, reason2, reason3, reason4, reason5, reason6, reason7, reason8, reason9][index],
    title: item.title,
    desc: item.desc,
  }));

const countryTemplate = (title, icon, description, reasons) => ({
  title,
  icon,
  description,
  reasonChoosing: buildReasons(reasons),
  uniLogo: defaultUniLogos,
});

export const extraCountryWiseDetail = {
  "new-zealand": countryTemplate(
    "New Zealand",
    NewZealand,
    "NEW ZEALAND is a scenic island nation in the South Pacific, known for its world-class universities, safe communities, and strong focus on research and innovation. It offers a welcoming environment for international students with excellent post-study work opportunities.",
    [
      { title: "Globally Recognized Qualifications", desc: "New Zealand degrees are respected worldwide. Universities such as the University of Auckland and University of Otago deliver high-quality teaching across business, engineering, health sciences, and environmental studies." },
      { title: "Safe and Inclusive Student Life", desc: "Consistently ranked among the world's safest countries, New Zealand offers a peaceful lifestyle, multicultural cities, and supportive campus communities for international students." },
      { title: "Research and Innovation Focus", desc: "Students benefit from practical, research-led learning in fields like agriculture, sustainability, biotechnology, and information technology with strong industry connections." },
      { title: "Gateway to the Asia-Pacific", desc: "Studying in New Zealand positions students within one of the world's fastest-growing economic regions, opening doors to careers across Asia-Pacific markets." },
      { title: "Flexible Intakes", desc: "Most universities offer February and July intakes, with some programs available in additional semesters. Early applications are recommended for visa and accommodation planning." },
      { title: "Cost of Studying in New Zealand", desc: "Undergraduate tuition typically ranges from NZD 22,000 to NZD 35,000 per year, with postgraduate programs from NZD 26,000 to NZD 45,000. Living costs average NZD 15,000–20,000 annually." },
      { title: "Scholarships and Financial Support", desc: "International students can access university scholarships, government awards, and faculty-specific grants based on academic merit and program of study." },
      { title: "Entry Requirements", desc: "Applicants need recognized academic qualifications, English proficiency (IELTS 6.0–6.5 or equivalent), a statement of purpose, references, and proof of funds for tuition and living expenses." },
      { title: "Student Visa Process", desc: "The Fee Paying Student Visa allows full-time study with part-time work rights. Students must provide an offer letter, proof of funds, health insurance, and complete an online application with biometrics." },
    ]
  ),
  cyprus: countryTemplate(
    "Cyprus",
    Cyprus,
    "CYPRUS is a Mediterranean island nation and EU member state offering affordable English-taught programs, a warm climate, and a strategic location between Europe, Asia, and Africa.",
    [
      { title: "EU-Recognized Education", desc: "Cyprus universities follow European standards, offering bachelor's and master's programs in business, medicine, engineering, hospitality, and law with internationally recognized qualifications." },
      { title: "Affordable Tuition and Living", desc: "Compared to many Western European destinations, Cyprus offers competitive tuition fees and reasonable living costs, making quality education more accessible." },
      { title: "English-Taught Programs", desc: "A wide range of courses are delivered in English, removing language barriers while students can also experience local culture and optional Greek language learning." },
      { title: "Mediterranean Lifestyle", desc: "Students enjoy a high quality of life with beautiful coastlines, historic cities, and a relaxed environment ideal for balancing academics and personal growth." },
      { title: "Academic Intakes", desc: "Universities typically have intakes in September/October and February. Application deadlines vary by institution and program level." },
      { title: "Cost of Studying in Cyprus", desc: "Tuition fees range from €3,000 to €12,000 per year depending on the program. Monthly living expenses are approximately €700–€1,000 including accommodation, food, and transport." },
      { title: "Scholarships", desc: "Merit-based and need-based scholarships are available through universities and government initiatives for eligible international students." },
      { title: "Entry Requirements", desc: "Students must submit academic transcripts, passport copy, proof of English proficiency, and program-specific documents such as portfolios or entrance exams where required." },
      { title: "Student Visa and Residence Permit", desc: "Non-EU students apply for a student visa through the Cyprus embassy, providing admission letter, financial proof, health insurance, and accommodation confirmation." },
    ]
  ),
  denmark: countryTemplate(
    "Denmark",
    Denmark,
    "DENMARK is a Scandinavian leader in innovation, sustainability, and design, offering English-taught programs, student-centered learning, and an exceptional quality of life.",
    [
      { title: "World-Class Universities", desc: "Institutions like the University of Copenhagen, DTU, and Aarhus University rank among Europe's best, with strengths in engineering, life sciences, business, and social sciences." },
      { title: "Innovation and Sustainability", desc: "Denmark is a global pioneer in green technology, renewable energy, and design thinking, giving students exposure to cutting-edge research and industry partnerships." },
      { title: "Student-Centered Learning", desc: "Danish education emphasizes collaboration, critical thinking, and project-based learning rather than rote memorization, preparing graduates for modern workplaces." },
      { title: "High Quality of Life", desc: "Denmark consistently ranks among the happiest countries globally, with excellent healthcare, cycling-friendly cities, and a strong work-life balance culture." },
      { title: "Intakes in Denmark", desc: "The main intake is in September, with some master's programs offering January or February starts. Applications are typically submitted via optagelse.dk or directly to universities." },
      { title: "Cost of Studying in Denmark", desc: "Non-EU tuition ranges from €6,000 to €16,000 per year. Living costs average €800–€1,200 per month, with Copenhagen being the most expensive city." },
      { title: "Scholarships", desc: "Danish government scholarships and university grants are available for highly qualified non-EU students, often covering partial or full tuition." },
      { title: "Entry Requirements", desc: "Applicants need recognized prior qualifications, English proficiency (IELTS 6.5 or TOEFL equivalent), motivation letter, CV, and references for most programs." },
      { title: "Residence Permit Process", desc: "Students apply for a residence permit after admission, providing proof of funds, health insurance, and biometric data. Part-time work is permitted during studies." },
    ]
  ),
  france: countryTemplate(
    "France",
    France,
    "FRANCE combines centuries of academic tradition with modern research excellence, offering diverse programs in arts, business, engineering, and sciences across vibrant student cities.",
    [
      { title: "Prestigious Academic Heritage", desc: "Home to Sorbonne, Sciences Po, HEC Paris, and leading grandes écoles, France offers globally respected degrees across humanities, business, fashion, and STEM fields." },
      { title: "Affordable Public Education", desc: "Public universities charge relatively low tuition for international students, making France an attractive destination for high-quality education at competitive costs." },
      { title: "Cultural and Global Exposure", desc: "Students immerse themselves in art, history, cuisine, and European culture while studying in one of the world's most visited and influential nations." },
      { title: "Growing English-Taught Options", desc: "Over 1,500 programs are now taught in English, especially at master's level, allowing international students to study without fluent French." },
      { title: "Intakes in France", desc: "The academic year begins in September, with some programs offering spring intake. Campus France guides students through the application and visa process." },
      { title: "Cost of Studying in France", desc: "Public university fees are approximately €2,770–€3,770 per year for bachelor's and master's. Living costs range from €800–€1,400 monthly depending on the city." },
      { title: "Scholarships", desc: "Eiffel Excellence, Charpak, and university-specific scholarships support international students based on merit, nationality, and field of study." },
      { title: "Entry Requirements", desc: "Requirements include academic transcripts, language proof (English or French), motivation letter, CV, and Campus France validation for most applicants." },
      { title: "Student Visa Process", desc: "After admission, students apply for a long-stay student visa (VLS-TS) with proof of funds, accommodation, health insurance, and OFII registration upon arrival." },
    ]
  ),
  italy: countryTemplate(
    "Italy",
    Italy,
    "ITALY offers a rich blend of history, art, and academic excellence with renowned universities in design, architecture, engineering, medicine, and the humanities.",
    [
      { title: "Historic Universities", desc: "Italy hosts some of Europe's oldest universities, including Bologna and Sapienza, offering respected programs across diverse disciplines." },
      { title: "Design, Fashion, and Creative Arts", desc: "Italy is a global capital for fashion, design, architecture, and fine arts, providing unmatched creative industry exposure and internship opportunities." },
      { title: "Affordable Education", desc: "Public universities offer competitive tuition based on family income, and regional scholarships help reduce costs for international students." },
      { title: "Central European Location", desc: "Italy's location provides easy travel across Europe, enriching the student experience with cultural exploration and networking opportunities." },
      { title: "Intakes in Italy", desc: "Most programs start in September/October, with limited spring intake for certain master's courses. Pre-enrollment via Universitaly is required for many programs." },
      { title: "Cost of Studying in Italy", desc: "Tuition at public universities ranges from €900 to €4,000 per year. Living expenses average €700–€1,200 monthly, with higher costs in Milan and Rome." },
      { title: "Scholarships", desc: "DSU regional scholarships, university grants, and government awards provide tuition waivers and living allowances for eligible students." },
      { title: "Entry Requirements", desc: "Students need a valid diploma, English or Italian language proof, pre-enrollment confirmation, and program-specific documentation." },
      { title: "Student Visa Process", desc: "Non-EU students apply for a Type D study visa at the Italian consulate, submitting admission letter, financial proof, accommodation, and health insurance." },
    ]
  ),
  finland: countryTemplate(
    "Finland",
    Finland,
    "FINLAND is celebrated for its world-leading education system, innovation culture, and stunning natural landscapes, offering English-taught degrees and a student-friendly society.",
    [
      { title: "Top-Ranked Education System", desc: "Finnish universities like Aalto and the University of Helsinki excel in technology, design, education, and sustainability with a focus on practical skills." },
      { title: "Innovation and Technology Hub", desc: "Finland is home to global leaders in mobile technology, gaming, and clean energy, offering students direct access to thriving industries." },
      { title: "Equality and Student Welfare", desc: "Finnish society values equality and well-being, with comprehensive student services, affordable student housing, and campus support networks." },
      { title: "English-Taught Programs", desc: "Hundreds of bachelor's and master's programs are available in English, attracting international talent across STEM and business fields." },
      { title: "Intakes in Finland", desc: "The primary intake is in autumn (September), with a smaller spring intake for selected programs. Applications are submitted via Studyinfo.fi." },
      { title: "Cost of Studying in Finland", desc: "Non-EU tuition ranges from €8,000 to €18,000 per year. Living costs are approximately €700–€1,100 monthly including accommodation and daily expenses." },
      { title: "Scholarships", desc: "Universities offer merit-based tuition fee waivers and scholarships covering 50–100% of tuition for outstanding international applicants." },
      { title: "Entry Requirements", desc: "Applicants submit academic records, English test scores (IELTS 6.5 or equivalent), motivation statement, and references through the centralized application portal." },
      { title: "Residence Permit Process", desc: "Students apply for a residence permit for studies with proof of funds (€560/month minimum), insurance, and university acceptance letter." },
    ]
  ),
  latvia: countryTemplate(
    "Latvia",
    Latvia,
    "LATVIA is a Baltic EU nation offering affordable European education, English-taught programs, and a growing hub for business, IT, and medical studies.",
    [
      { title: "EU Member Education", desc: "Latvian degrees are recognized across the European Union, with universities offering programs in medicine, dentistry, engineering, and business." },
      { title: "Affordable Tuition", desc: "Latvia provides some of Europe's most budget-friendly tuition fees, making it ideal for students seeking quality education at lower costs." },
      { title: "English-Medium Programs", desc: "Many universities offer full degree programs in English, particularly in health sciences, IT, and international business." },
      { title: "Safe and Scenic Environment", desc: "Students enjoy a peaceful lifestyle in historic cities like Riga, with rich culture, green spaces, and easy access to other Baltic and Nordic countries." },
      { title: "Intakes in Latvia", desc: "Universities typically have September and February intakes. Medical programs may have specific entrance exam schedules." },
      { title: "Cost of Studying in Latvia", desc: "Tuition ranges from €2,000 to €15,000 per year depending on the program. Living costs average €450–€700 per month." },
      { title: "Scholarships", desc: "Government and university scholarships are available for international students demonstrating academic excellence." },
      { title: "Entry Requirements", desc: "Applicants need secondary or bachelor's qualifications, English proficiency proof, passport, and program-specific documents such as entrance exams for medicine." },
      { title: "Student Visa and Residence Permit", desc: "Non-EU students obtain a long-term visa and residence permit with university invitation, financial proof, and health insurance documentation." },
    ]
  ),
  malta: countryTemplate(
    "Malta",
    Malta,
    "MALTA is a sunny Mediterranean EU island offering English as an official language, affordable tuition, and a welcoming environment for international students.",
    [
      { title: "English-Speaking EU Nation", desc: "As an official EU member with English as a national language, Malta removes language barriers while offering EU-recognized qualifications." },
      { title: "Affordable Programs", desc: "Universities and institutes offer competitively priced degrees in business, IT, hospitality, health sciences, and maritime studies." },
      { title: "Mediterranean Student Life", desc: "Students enjoy year-round sunshine, historic architecture, and a vibrant international community in a compact, easy-to-navigate country." },
      { title: "Strategic Location", desc: "Malta's position in the Mediterranean provides cultural diversity and connections to European, North African, and Middle Eastern markets." },
      { title: "Intakes in Malta", desc: "Programs typically begin in October and February. Rolling admissions are available at many private institutions." },
      { title: "Cost of Studying in Malta", desc: "Tuition ranges from €5,000 to €12,000 per year. Monthly living expenses are approximately €700–€1,000 including shared accommodation." },
      { title: "Scholarships", desc: "Merit-based scholarships and early-bird tuition discounts are offered by several Maltese universities and colleges." },
      { title: "Entry Requirements", desc: "Students submit academic certificates, English proficiency scores, passport copy, and personal statement. Some programs require interviews." },
      { title: "Student Visa Process", desc: "Non-EU students apply for a student visa through the Maltese embassy with admission letter, financial guarantee, health insurance, and accommodation proof." },
    ]
  ),
  norway: countryTemplate(
    "Norway",
    Norway,
    "NORWAY offers tuition-free education at public universities for all students, exceptional quality of life, and strong programs in energy, marine sciences, and technology.",
    [
      { title: "Tuition-Free Public Universities", desc: "Public universities in Norway charge no tuition fees, only a small semester fee, making world-class education highly accessible." },
      { title: "High Academic Standards", desc: "Universities like UiO, NTNU, and UiB deliver rigorous programs in engineering, natural sciences, business, and Arctic research." },
      { title: "Stunning Natural Environment", desc: "Students experience fjords, northern lights, and outdoor lifestyle while studying in one of the world's most environmentally conscious nations." },
      { title: "English-Taught Degrees", desc: "A growing number of master's and bachelor's programs are taught entirely in English, attracting international students globally." },
      { title: "Intakes in Norway", desc: "The main academic year starts in August. Application deadlines for international students are typically between December and March." },
      { title: "Cost of Living in Norway", desc: "While tuition is free, living costs are higher at approximately NOK 12,000–15,000 per month. Students should budget for accommodation, food, and transport." },
      { title: "Scholarships and Funding", desc: "Although tuition is free, scholarships like the Norwegian Quota Scheme and Erasmus+ support living expenses for eligible students." },
      { title: "Entry Requirements", desc: "Applicants need recognized qualifications, English proficiency (IELTS/TOEFL), and specific prerequisites for certain programs." },
      { title: "Student Residence Permit", desc: "Non-EU students apply for a study permit with proof of funds (NOK 128,887 per year), admission letter, and accommodation confirmation." },
    ]
  ),
  poland: countryTemplate(
    "Poland",
    Poland,
    "POLAND is a dynamic EU destination with affordable tuition, respected universities, and growing popularity among international students in medicine, engineering, and business.",
    [
      { title: "Recognized European Degrees", desc: "Polish universities offer EU-compliant degrees in medicine, dentistry, engineering, and economics recognized across Europe and beyond." },
      { title: "Affordable Tuition and Living", desc: "Poland offers excellent value with tuition from €2,000 to €6,000 per year and living costs among the lowest in the EU." },
      { title: "Rich History and Culture", desc: "Students explore centuries of European heritage in cities like Warsaw, Kraków, and Wrocław while enjoying a lively student culture." },
      { title: "English-Taught Programs", desc: "Over 800 programs are available in English, especially in medical and technical fields attracting international cohorts." },
      { title: "Intakes in Poland", desc: "Universities offer October and February intakes. Medical programs may require entrance exams in biology and chemistry." },
      { title: "Cost of Studying in Poland", desc: "Tuition ranges from €2,000 to €8,000 annually. Monthly living expenses average €400–€700, making it highly budget-friendly." },
      { title: "Scholarships", desc: "Polish government scholarships (NAWA), university grants, and Erasmus+ funding support talented international students." },
      { title: "Entry Requirements", desc: "Applicants provide academic transcripts, English proficiency, passport, and nostrification of documents where required." },
      { title: "Student Visa and Residence Card", desc: "Non-EU students obtain a national visa and temporary residence card with university acceptance, financial proof, and health insurance." },
    ]
  ),
  singapore: countryTemplate(
    "Singapore",
    Singapore,
    "SINGAPORE is a global education and business hub in Asia, home to top-ranked universities, cutting-edge research, and outstanding career prospects.",
    [
      { title: "World-Ranked Universities", desc: "NUS and NTU consistently rank among Asia's and the world's best, offering excellence in engineering, computing, business, and life sciences." },
      { title: "Asia's Economic Gateway", desc: "Singapore connects students to multinational corporations, startups, and finance hubs across Southeast Asia and the broader Asia-Pacific region." },
      { title: "Multicultural Environment", desc: "A diverse, English-speaking society welcomes students from around the world with world-class infrastructure and safety." },
      { title: "Research and Innovation", desc: "Students access state-of-the-art labs, industry partnerships, and government-backed research initiatives in technology and biomedical sciences." },
      { title: "Intakes in Singapore", desc: "Most universities have August intake, with some programs offering January intake. Application deadlines are typically 6–9 months before commencement." },
      { title: "Cost of Studying in Singapore", desc: "Tuition ranges from SGD 20,000 to SGD 45,000 per year. Living expenses average SGD 1,000–1,500 monthly including accommodation." },
      { title: "Scholarships", desc: "Singapore government scholarships, ASEAN scholarships, and university merit awards cover tuition and provide living stipends for outstanding students." },
      { title: "Entry Requirements", desc: "Applicants need strong academic records, English proficiency (IELTS 6.5+), SAT/GRE for some programs, essays, and recommendation letters." },
      { title: "Student Pass Process", desc: "After acceptance, the university applies for a Student's Pass through ICA. Students need medical exam, financial proof, and valid passport." },
    ]
  ),
  spain: countryTemplate(
    "Spain",
    Spain,
    "SPAIN offers vibrant student life, affordable education, and prestigious universities across business, tourism, architecture, arts, and sciences.",
    [
      { title: "Renowned Universities", desc: "Institutions like the University of Barcelona, Complutense, and IE Business School offer respected programs across diverse academic fields." },
      { title: "Affordable European Education", desc: "Public university fees are relatively low compared to other Western European countries, with regional variations across autonomous communities." },
      { title: "Rich Culture and Lifestyle", desc: "Students experience world-famous cuisine, festivals, art, and architecture while enjoying a warm climate and active social life." },
      { title: "Growing English Programs", desc: "An increasing number of master's and bachelor's programs are taught in English, particularly in business, tourism, and international relations." },
      { title: "Intakes in Spain", desc: "The academic year runs from September to June. Most undergraduate programs have a single September intake; some master's offer spring entry." },
      { title: "Cost of Studying in Spain", desc: "Public tuition ranges from €750 to €3,500 per year. Living costs average €700–€1,100 monthly, with Madrid and Barcelona at the higher end." },
      { title: "Scholarships", desc: "Spanish government grants, Erasmus+ funding, and university-specific scholarships support international students based on merit and need." },
      { title: "Entry Requirements", desc: "Students need homologation of prior studies, language proof (Spanish or English), application through university portals, and supporting documents." },
      { title: "Student Visa Process", desc: "Non-EU students apply for a Type D student visa with admission letter, financial means (€600/month), health insurance, and criminal record certificate." },
    ]
  ),
};
