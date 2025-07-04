import RandomWebtoonsCarousel from "@/components/RandomWebtoonsCarousel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import WebtoonsFiltersForm from "@/components/WebtoonsFiltersForm";

const Webtoons = async () => {
  return (
    <main className="flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit border-2 self-center mr-2 cursor-pointer hover:text-purple-400 hover:border-purple-400">
            Custom filter
          </Button>
        </DialogTrigger>{" "}
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] bg-dark-gray text-white z-1000">
          <DialogHeader>
            <DialogTitle>Custom list filter</DialogTitle>
            <DialogDescription>
              Re-generate your current list with your preferences.
            </DialogDescription>
          </DialogHeader>
          <WebtoonsFiltersForm />
        </DialogContent>
      </Dialog>
      <RandomWebtoonsCarousel />
    </main>
  );
};

export default Webtoons;
