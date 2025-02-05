
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay
} from "@/components/ui/dialog"

interface LoadingProps {
  loading: boolean;
  setLoading: (value: boolean) => void;
}


export default function Loading({ loading, setLoading }: LoadingProps){

  return(
    <>
    <Dialog open={loading} onOpenChange={setLoading}>
      <DialogOverlay>
      <DialogContent className="w-80 h-72 items-center text-center rounded-3xl bg-opacity-0">
      <DialogHeader>
       <img src="/icons/info.svg" className="w-6 h-6 self-center"/>
        <p className="font-medium text-xl">Philly Truce would like to Send you push notifications.</p>
      </DialogHeader>
      <DialogDescription className="self-center">
        <p className="font-normal text-sm">Notifications help inform you of new incident reports,new messages and report updates.</p>
      </DialogDescription>
      <DialogFooter className="flex flex-row gap-8 justify-center">
        <button className="text-sm font-medium focus:outline-none" onClick={()=>setLoading(false)}>Set up later</button>
        <button className="text-primary font-extrabold text-sm">Allow</button>
      </DialogFooter>
      </DialogContent>
      </DialogOverlay>
    </Dialog>
    <div className="flex items-center justify-center h-screen w-screen">
       <Image src='/icons/philly-truce-logo.svg' alt='logo' width={230} height={283}/>
    </div>
    </>
  )
}