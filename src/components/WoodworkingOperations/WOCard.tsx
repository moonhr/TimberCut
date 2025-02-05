import Image from "next/image";

interface WOCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

const WOCard: React.FC<WOCardProps> = ({ name, image, onClick }) => {
  return (
    <div
      className="flex flex-col justify-center items-center border border-black rounded-sm p-1 w-20 bg-gray-100 hover:bg-gray-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="wo-card-image">
        <Image src={image} alt={name} width={50} height={50} />
      </div>
      <p className="text-xs">{name}</p>
    </div>
  );
};

export default WOCard;
