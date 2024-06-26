import "./styles.css";
type Props = {
  text: string;
  action?: () => void;
};

const UnderlinedAnimatedLink = ({ text, action }: Props) => {
  return (
    <div className="pb-1 relative" onClick={action ? () => action() : () => {}}>
      <span className="link link-underline link-underline-primary cursor-pointer sm:text-3xl lg:text-base select-none font-kalnia font-normal">
        <span>{text}</span>
      </span>
    </div>
  );
};

export default UnderlinedAnimatedLink;
