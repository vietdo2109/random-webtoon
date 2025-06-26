import { Button } from "./ui/button";

const MediaButton = ({
  children,
  link,
}: Readonly<{
  children: React.ReactNode;
  link: string;
}>) => {
  return (
    <a href={link} target="_blank">
      <Button
        variant="link"
        className="bg-[#28292C] rounded-full p-0 w-[40px] h-[40px] text-light-gray cursor-pointer hover:bg-gray-700"
      >
        {children}
      </Button>
    </a>
  );
};

export default MediaButton;
