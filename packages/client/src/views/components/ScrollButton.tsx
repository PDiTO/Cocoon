type TScrollButton = {
  buttonText: string;
  sectionId: string;
  buttonStyles: string;
};

const ScrollButton = ({
  buttonText,
  sectionId,
  buttonStyles,
}: TScrollButton) => {
  function handleClick({}) {
    const section = document.querySelector(`#${sectionId}`);
    section?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <button onClick={handleClick} className={buttonStyles} type="button">
      {buttonText}
    </button>
  );
};

export default ScrollButton;
