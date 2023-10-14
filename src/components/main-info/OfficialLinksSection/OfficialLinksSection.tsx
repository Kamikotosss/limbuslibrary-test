import { OfficialLinks } from "../../official-links/OfficialLinks"
import "./OfficialLinkSection.css"
export const OfficialLinksSection: React.FC = () => {
    return <section className="official-links-section">
        <h2>Ссылки на официальные источники</h2>
       <OfficialLinks/>
    </section>
}