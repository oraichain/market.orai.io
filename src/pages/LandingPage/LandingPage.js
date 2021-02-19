import LANDING_DECO from "../../assets/landing_decoration.svg";
import LANDING_LOGO_1 from "../../assets/landing_logo_1.svg";
import LANDING_LOGO_2 from "../../assets/landing_logo_2.svg";
import LANDING_LOGO_3 from "../../assets/landing_logo_3.svg";
import LANDING_LOGO_4 from "../../assets/landing_logo_4.svg";
import AVATAR_1 from "../../assets/user_avatar_1.svg";
import AVATAR_2 from "../../assets/user_avatar_2.svg";
import AVATAR_3 from "../../assets/user_avatar_3.svg";
import CONTACT from "../../assets/contact.svg";
import { Button, Input } from 'antd';
import ArtworkFunction from '@/components/ArtworkFunction';
import Comment from '@/components/Comment';
import 'antd/dist/antd.css';
import styles from "./LandingPage.less";
import TextArea from 'antd/lib/input/TextArea';

function LandingPage(props) {
  return (
    <div className={styles.screen}>
      <div className={styles.background}>
        <div className={styles.introContainer}>
          <div className={styles.landingTitle}>Build &amp; Own</div>
          <div className={styles.landingTitle} style={{ marginBottom: 10 }}>AI-created Artwork</div>
          <div className={styles.landingSubtitle}>Making stunning arts in an instant?</div>
          <div className={styles.landingSubtitle}>This is what we made for you</div>
          <div className={styles.exploreBtnContainer}>
            <Button type="primary" className={styles.button}>Explore Provider</Button>
            <Button className={styles.simpleBtn}>Check Assets</Button>
          </div>
        </div>
        <img src={LANDING_DECO} className={styles.decoration} />
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>Easy artwork, easy licensing!</div>
        <div className={styles.sectionDivider} />
        <div className={styles.sectionContent}>
          <ArtworkFunction
            logo={LANDING_LOGO_1}
            title="Auto Generator Image"
            description="Use Deep learning to generate the image, painting, and other arts with style pick from the provider list." />
          <ArtworkFunction
            logo={LANDING_LOGO_2}
            title="Auto Create License"
            description="Each image created has a unique license. This license will be written in blockchain block and can't be changed or deleted." />
          <ArtworkFunction
            logo={LANDING_LOGO_3}
            title="AI Providers"
            description="You can select your provider and view their demo sample. Then you can create your art with your liked style and color you want." />
          <ArtworkFunction
            logo={LANDING_LOGO_4}
            title="Buy &amp; Sell"
            description="With new art created and its license, you can buy it from another and sell it on market. All your transactions will be seen in block information." />
        </div>
        <Button type="primary" className={styles.button}>Try it out now</Button>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionTitle}>Someone who used our product</div>
        <div className={styles.sectionDivider} />
        <div className={styles.sectionContent}>
          <Comment
            avatar={AVATAR_1}
            content="This auto-generator app helps me save time when I need something wow for my website. Can't wait to try more new styles!"
            author="Diana" />
          <Comment
            avatar={AVATAR_2}
            content="Extraordinary! I had never thought that one day I could have my arts that way. It was built rapidly and blew my mind."
            author="Benjamin" />
          <Comment
            avatar={AVATAR_3}
            content="I could use deep learning network to generate the image easily. The result is well then I can use that for my own business."
            author="Sebastian" />
        </div>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contactTitleContainer}>
          <img src={CONTACT} style={{ width: "40%" }} />
          <div className={styles.semiTitle}>Contact Us</div>
          <div className={styles.sectionDivider} />
          <div className={styles.landingSubtitle}>Let us know how you feel</div>
          <div className={styles.landingSubtitle}>This app will gonna be better!</div>
        </div>
        <div className="feedbackContainer">
          <Input
            size="large"
            placeholder="Your email"
            className={styles.inputFeedback} />
          <Input
            size="large"
            placeholder="Wallet address"
            className={styles.inputFeedback} />
          <TextArea
            showCount
            maxLength={1000}
            size="large"
            placeholder="Description"
            className={styles.inputFeedback} />
          <Button
            block={false}
            type="primary"
            className={styles.button}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;