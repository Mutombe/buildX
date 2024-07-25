import Button from "react-bootstrap/Button";

interface MainButtonProps {
  variant: string;
  text: string;
  onClick: any;
}

const MainButton = ({
  variant,
  text,
  onClick,
  ...props
}: MainButtonProps) => {
  return (
    <Button variant={variant} onClick={onClick} {...props}>
      {text}
    </Button>
  );
};

export default MainButton;
