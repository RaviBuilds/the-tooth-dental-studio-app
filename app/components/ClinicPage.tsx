"use client";

import Image from "next/image";
import { Hero } from "./sections/Hero";
import { Proof } from "./sections/Proof";
import { Atlas } from "./sections/Atlas";
import { Diagnosis } from "./sections/Diagnosis";

const img = (name:string) => `/images/${name}`;
const clinic = "clinic images/";
const doctor = "Dr photo/";

function Eyebrow({children}:{children:React.ReactNode}) { return <p className="eyebrow text-gold">{children}</p> }
function ArrowLink({children, href="#contact"}:{children:React.ReactNode; href?:string}) { return <a className="focus-ring inline-flex items-center gap-4 border-b border-gold pb-2 text-sm font-semibold tracking-wide transition-transform duration-300 hover:translate-x-1" href={href}>{children}<span aria-hidden>↗</span></a> }
function Section({id, children, dark=false, className=""}:{id:string;children:React.ReactNode;dark?:boolean;className?:string}) { return <section id={id} className={`${dark?"bg-charcoal text-background":"bg-background"} ${className}`}>{children}</section> }

function PhoneIcon() { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>; }

export function Navigation() {
  return (
    <header className="site-nav">
      <a href="#top" className="nav-brand focus-ring" aria-label="The Tooth Dental Studio, Tolichowki, Hyderabad - home">
        <Image src="/images/tooth-dental-studio-logo.png" alt="" width={92} height={92} sizes="92px" preload className="nav-logo" />
      </a>
      <nav className="nav-links" aria-label="Primary">
        <a className="focus-ring" href="#approach">Approach</a>
        <a className="focus-ring" href="#doctor">Doctor</a>
        <a className="focus-ring" href="#studio">Studio</a>
        <a className="focus-ring" href="#contact">Contact</a>
      </nav>
      <div className="nav-actions">
        <a className="nav-phone focus-ring" href="tel:+919966340056">
          <PhoneIcon />
          <span>{"099663 40056"}</span>
        </a>
        <a className="nav-cta focus-ring" href="#contact">
          {"Book a Visit"} <span aria-hidden>{"\u2197"}</span>
        </a>
        <a className="nav-call focus-ring" href="tel:+919966340056" aria-label="Call the clinic - 099663 40056">
          <PhoneIcon />
        </a>
      </div>
    </header>
  );
}


export function Authority(){return <Section id="trust" dark className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[1fr_1.4fr] md:items-end"><div><Eyebrow>1,147 PATIENT VOICES</Eyebrow><div className="display mt-12 text-[9rem] leading-[.72] text-gold md:text-[14rem]">5.0</div><p className="mt-8 text-xl">★★★★★ <span className="text-background/50">/ Google Reviews</span></p></div><div><h2 className="display max-w-2xl text-6xl md:text-8xl">A reputation built one experience at a time.</h2><p className="mt-8 max-w-xl text-lg leading-8 text-background/70">A good dental visit is not simply about completing a procedure. It is about understanding the problem, knowing your options, feeling comfortable with the plan and knowing that someone is paying attention throughout the process.</p><p className="mt-12 max-w-xl text-2xl leading-9 text-gold">The rating is the number. The experience is the reason.</p></div></div></Section>}
export function Doctor(){return <Section id="doctor" className="overflow-hidden px-6 py-24 md:px-10 md:py-36"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[.9fr_1.1fr] md:items-center"><div className="relative min-h-[540px]"><Image src={img(doctor+"dr-mohammed-imran-ali-tooth-dental-studio-hyderabad-01.png")} alt="Dr. Mohammed Imran Ali at The Tooth Dental Studio" fill className="object-contain object-bottom" sizes="(max-width: 768px) 100vw, 50vw"/></div><div><Eyebrow>THE DENTIST BEHIND THE STUDIO</Eyebrow><h2 className="display mt-8 text-6xl md:text-8xl">Dr. Mohammed Imran Ali</h2><p className="mt-4 text-sm uppercase tracking-widest text-muted">General Dentist</p><p className="mt-10 max-w-xl text-lg leading-8 text-muted">Dr. Mohammed Imran Ali approaches dentistry with a simple priority: understand the patient, explain the treatment clearly, and make the experience as comfortable as possible.</p><p className="mt-10 font-serif text-3xl italic">“Your dental health is my priority.”</p><div className="mt-10"><ArrowLink href="#contact">Discover the Doctor</ArrowLink></div></div></div></Section>}
export function Studio(){const pics=["tooth-dental-studio-tolichowki-hyderabad.webp","tooth-dental-studio-treatment-room-tolichowki-hyderabad-01.jpg","tooth-dental-studio-treatment-room-tolichowki-hyderabad-03.webp"];return <Section id="studio" dark className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Eyebrow>INSIDE THE STUDIO</Eyebrow><h2 className="display mt-6 max-w-2xl text-6xl md:text-8xl">A space where care happens.</h2></div><p className="max-w-sm text-base leading-7 text-background/65">Step inside The Tooth Dental Studio in Tolichowki and you&apos;ll find a practical, modern clinical environment built for focused dental care.</p></div><div className="gallery mt-16 flex snap-x gap-5 overflow-x-auto pb-4">{pics.map((p,i)=><div className="min-w-[78vw] snap-start md:min-w-[31%]" key={p}><div className="relative aspect-[4/5]"><Image src={img(clinic+p)} alt={["The Tooth Dental Studio reception","The Tooth Dental Studio treatment room","Clinical detail inside the studio"][i]} fill className="object-cover" sizes="(max-width: 768px) 78vw, 31vw"/></div><p className="eyebrow mt-4 text-background/60">{["THE SPACE","THE CHAIR","THE DETAILS"][i]}</p></div>)}</div></div></Section>}
export function Care(){return <Section id="care" className="px-6 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><Eyebrow>HOW WE CARE</Eyebrow><h2 className="display mt-8 max-w-3xl text-6xl md:text-8xl">Clear care. From first question to final follow-up.</h2><div className="mt-20 grid gap-0 md:grid-cols-4">{[["01","LISTEN","Start with the problem, not the procedure."],["02","EXPLAIN","Know what we&apos;re doing — and why."],["03","TREAT","Careful hands. Calm surroundings."],["04","FOLLOW UP","Care shouldn&apos;t end at the dental chair."]].map(([n,t,c])=><div key={n} className="editorial-rule border-foreground/20 px-0 py-8 md:border-l md:border-t-0 md:px-7"><p className="eyebrow text-gold">{n}</p><h3 className="mt-10 text-2xl font-semibold">{t}</h3><p className="mt-5 text-sm leading-7 text-muted">{c}</p></div>)}</div></div></Section>}
export function Emergency(){return <Section id="emergency" dark className="px-6 py-24 md:px-10 md:py-32"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-12 md:flex-row md:items-end"><div><Eyebrow>WHEN PAIN CAN&apos;T WAIT</Eyebrow><h2 className="display mt-7 max-w-3xl text-7xl md:text-[9rem]">Prompt care.<br/><span className="text-gold">Clear next steps.</span></h2></div><div className="max-w-sm"><p className="text-lg leading-8 text-background/70">Patients have shared experiences of reaching Dr. Imran during the night and receiving prompt attention when they needed it most. Prompt dental assessment can help determine the right next step.</p><p className="mt-6 text-xs leading-5 text-background/45">Current emergency availability should be confirmed with the clinic before publishing.</p><div className="mt-8"><ArrowLink>Contact the Clinic</ArrowLink></div></div></div></Section>}
export function Stories(){const reviews=[["Spoorthi K.","I was very nervous initially, but his composure and professionalism made the entire experience feel smooth and comfortable."],["Sridevi Reddy Aellala","He was kind and patient with kids."],["Hamza Mohammed","He attended to me at 12 AM... and made sure I was comfortable throughout the procedure."]]; return <Section id="stories" className="px-6 py-24 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><div><Eyebrow>PATIENT STORIES</Eyebrow><h2 className="display mt-7 max-w-3xl text-6xl md:text-8xl">What people remember is how they felt.</h2></div><span className="hidden text-4xl text-gold md:block">↘</span></div><div className="mt-20 grid gap-5 md:grid-cols-3">{reviews.map(([name,quote],i)=><article className={`${i===1?'bg-charcoal text-background':'bg-surface'} p-8 md:p-10`} key={name}><p className="text-3xl text-gold">“</p><p className="mt-8 text-lg leading-8">{quote}</p><p className="eyebrow mt-12 opacity-60">{name}</p></article>)}</div></div></Section>}
export function Contact(){return <footer id="contact" className="bg-charcoal px-6 py-24 text-background md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><Eyebrow>THE NEXT STEP</Eyebrow><div className="mt-8 flex flex-col justify-between gap-12 md:flex-row md:flex-wrap md:items-end"><h2 className="display max-w-4xl text-7xl md:text-[9rem]">Care starts with a conversation.</h2><div className="max-w-xs"><p className="text-background/65">Book an appointment at The Tooth Dental Studio in Tolichowki, Hyderabad.</p><div className="mt-8"><ArrowLink>Book an Appointment</ArrowLink></div></div></div><div className="mt-28 border-t border-background/20 pt-8 text-sm text-background/60"><p>Nasr Plaza, Plot No. 158, above UCO Bank, beside Honda Showroom, Surya Nagar Colony, Toli Chowki, Hyderabad, Telangana 500008</p><div className="mt-8 flex flex-col justify-between gap-4 md:flex-row"><span>THE TOOTH DENTAL STUDIO · BY DR. MOHAMMED IMRAN ALI</span><a href="#top" className="focus-ring text-gold">Back to top ↑</a></div></div></div></footer>}
export function ClinicPage(){return <><Navigation/><main><Hero/><Proof/><Atlas/><Diagnosis/><Authority/><Doctor/><Studio/><Care/><Emergency/><Stories/><Contact/></main></>}
