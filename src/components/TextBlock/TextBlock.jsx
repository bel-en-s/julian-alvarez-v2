import "./TextBlock.css";

import Copy from "../Copy/Copy";
import BrandIcon from "../BrandIcon/BrandIcon";
import ContactForm from "../ContactForm/ContactForm";

const TextBlock = () => {
  return (
    <section className="text-block">
      <div className="container">
        <div className="text-block-col">
          <Copy>
            <h3>El hombre araña,</h3>
            <br />
            <h3>el nueve</h3>
          </Copy>
          <div className="text-block-logo">
            <BrandIcon />
          </div>
        </div>
        <div className="text-block-col">
          <div className="text-block-copy">
          <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextBlock;
