import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`flex items-center m-2 justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border-slate-400 ${
        disabled && "opacity-50 cursor-not-allowed"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon size={25} style={{ border: "1px solid black", padding: "4px" }} />
    </button>
  );
};

export default ActionBtn;
