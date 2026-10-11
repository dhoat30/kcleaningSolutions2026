import styles from "./CleaningServices.module.scss";

const services = [
  {
    title: "Deep & spring cleaning",
    description: "A one-off refresh for the jobs that need more attention, whether you’re catching up on cleaning or getting ready for guests.",
    inclusions: "Detailed cleaning of kitchens, bathrooms and living areas, including skirting boards and accessible surfaces.",
  },
  {
    title: "Oven cleaning",
    description: "Let us tackle the baked-on grease and burnt-on food. Book an oven clean on its own or request it alongside your house clean.",
    inclusions: "Deep cleaning of the oven interior, removable racks and trays, plus the oven door and glass.",
  },
  {
    title: "Window cleaning",
    description: "Bring more light into your home with professional interior and exterior window cleaning in Wellington and surrounding areas.",
    inclusions: "Window glass, frames, sills and tracks. Tell us about access and any hard-water stains so we can quote accurately.",
  },
  {
    title: "Carpet & upholstery cleaning",
    description: "Refresh well-used carpets and furniture with professional cleaning for everyday grime, spills and high-traffic areas.",
    inclusions: "Carpet extraction cleaning and upholstery care. Let us know about stains and fabric types so we can recommend the right treatment.",
  },
  {
    title: "Move-out & tenancy cleaning",
    description: "Moving home or preparing a rental? Get help with an end-of-tenancy clean tailored to your property and moving date.",
    inclusions: "Kitchen, bathroom and living-area cleaning to your property manager’s checklist. Ask us to include carpets, ovens or windows in your quote.",
  },
  {
    title: "Regular house cleaning",
    description: "A clean home that fits your routine. Choose weekly, fortnightly or monthly visits for help with the everyday cleaning.",
    inclusions: "Kitchen surfaces, bathrooms, dusting, vacuuming and mopping. We’ll agree on the tasks that matter most to your household.",
  },
];

export default function CleaningServices() {
  return (
    <section id="our-services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>One local team. A home that feels clean.</p>
          <h2 id="services-heading">What can we take off your list?</h2>
          <p className={styles.introduction}>
            Choose a single service or ask us to combine a few. We’ll agree on the tasks and inclusions for your home before the work begins.
          </p>
        </div>
        <div className={styles.cards}>
          {services.map((service, index) => (
            <article className={styles.card} key={service.title}>
              <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <p className={styles.inclusions}>{service.inclusions}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
