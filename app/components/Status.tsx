import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`${bg} ${color} text-center rounded gap-1 flex items-center py-2 px-4`}
    >
      {text} <Icon size={15} />
    </div>
  );
};

export default Status;
