import { FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin, FaReddit, FaInstagram } from 'react-icons/fa';

interface SocialShareButtonsProps {
    urlEncodedLink: string;
}

const SocialShareButtons = ({ urlEncodedLink }: SocialShareButtonsProps) => {
    return (
        <div style={{display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'center'}}>
            <a href={`https://wa.me/?text=${urlEncodedLink}`}>
                <FaWhatsapp size={24} color="#25D366" />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?display=page&u=${urlEncodedLink}`}>
                <FaFacebook size={24} color="#1877F2" />
            </a>
            <a href={`https://x.com/share?text=${urlEncodedLink}&url=https://pollnest.com/`}>
                <FaTwitter size={24} color="#1DA1F2" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlEncodedLink}`}>
                <FaLinkedin size={24} color="#0A66C2" />
            </a>
            <a href={`https://www.reddit.com/submit?url=${urlEncodedLink}`}>
                <FaReddit size={24} color="#FF4500" />
            </a>
            <a href="https://www.instagram.com/">
                <FaInstagram size={24} color="#E4405F" />
            </a>
        </div>
    );
};

export default SocialShareButtons;