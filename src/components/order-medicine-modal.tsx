"use client";

import { use, useState } from "react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Facility, Service, User } from "@/lib/types";
import { format } from "date-fns";
import {
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  UploadCloud,
} from "lucide-react";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { PostgrestError } from "@supabase/supabase-js";
import Dropzone from "react-dropzone";
import { getProfile } from "@/server-actions/auth";
import { placeOrder, uploadFile } from "@/server-actions/fetch";

export function OrderMedicineForm({
  promise,
}: {
  promise: Promise<{ data: Service | null; error: PostgrestError | null }>;
}) {
  const [step, setStep] = useState(1);
  const [periscription, setPeriscription] = useState<File>();
  const [deliverAddress, setDeliveryAddress] = useState<any>({});
  const [facility, setFacility] = useState<Facility>();
  const [orderDate, setOrderDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { data } = use(promise);

  const handlePlaceOrder = async () => {
    setLoading(true);
    if (!periscription || !facility || !deliverAddress) {
      setLoading(false);
      return;
    }

    const { data: user, error } = await getProfile();
    if (error || user?.role !== "patient") {
      console.log(error);
      toast({
        title: "Error:",
        description: "An error occured while placing order.",
      });
      setLoading(false);
      return;
    }
    const { url, error: uploadError } = await uploadFile(
      periscription,
      "periscriptions"
    );
    if (uploadError) {
      console.log(uploadError);
      toast({
        title: "Error:",
        description: "An error occured while placing order.",
      });
      setLoading(false);
      return;
    }
    const order = {
      facility_id: facility.id,
      patient_id: user.id,
      periscription_url: url,
      order_date: orderDate.toISOString(),
      delivery_address: deliverAddress,
    };

    const { error: placeError } = await placeOrder(order);
    if (placeError) {
      console.log(placeError);
      toast({
        title: "Error:",
        description: "An error occured while placing order.",
      });
      setLoading(false);
      return;
    }
    setLoading(false);
    setStep(4);
  };

  const resetAndClose = () => {
    setStep(1);
    setPeriscription(undefined);
    setDeliveryAddress({});
    setFacility(undefined);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card>
            <CardDescription className="text-muted-foreground p-5">
              Upload a periscription and get your medicine delivered.
            </CardDescription>
            <CardContent className="pt-6">
              <Dropzone
                maxFiles={1}
                onDrop={(acceptedFiles) => setPeriscription(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="border-2 border-dotted p-5 rounded-md text-muted-foreground text-center h-60 w-full flex flex-col gap-5 justify-center items-center"
                  >
                    {periscription ? (
                      <p className="text-lg">{periscription.name}</p>
                    ) : (
                      <>
                        <input {...getInputProps()} />
                        <UploadCloud size={40} />
                        <p className="text-lg">
                          Drag and drop the periscription file here, or click to
                          select a file
                        </p>
                      </>
                    )}
                  </div>
                )}
              </Dropzone>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!periscription}>
                Next <ChevronRight />
              </Button>
            </CardFooter>
          </Card>
        );
      case 2:
        return (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold">Delivery Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={deliverAddress.name ?? ""}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliverAddress,
                        name: e.target.value,
                      })
                    }
                    placeholder="Your full names"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={deliverAddress.phone ?? ""}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliverAddress,
                        phone: e.target.value,
                      })
                    }
                    placeholder="Phone number"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={deliverAddress.address ?? ""}
                  onChange={(e) =>
                    setDeliveryAddress({
                      ...deliverAddress,
                      address: e.target.value,
                    })
                  }
                  placeholder="Delivery address"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    value={deliverAddress.district ?? ""}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliverAddress,
                        district: e.target.value,
                      })
                    }
                    placeholder="Delivery district"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parish">Parish / Ward</Label>
                  <Input
                    id="parish"
                    value={deliverAddress.parish ?? ""}
                    onChange={(e) =>
                      setDeliveryAddress({
                        ...deliverAddress,
                        parish: e.target.value,
                      })
                    }
                    placeholder="Parish / ward"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant={"outline"} onClick={() => setStep(1)}>
                <ChevronLeft /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!deliverAddress}>
                Next <ChevronRight />
              </Button>
            </CardFooter>
          </Card>
        );
      case 3:
        return (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h2 className="text-lg font-semibold">Order from</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {" "}
                  Select from the service providers available.
                </p>
                <div className="flex flex-col gap-4">
                  {data?.facilities?.map((f, i) => (
                    <Button
                      key={i}
                      onClick={() => setFacility(f)}
                      variant={"outline"}
                      className="justify-start hover:bg-muted"
                    >
                      {facility === f && <Check />}
                      <h1 className="">{f.name}</h1>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ChevronLeft /> Back
              </Button>
              <Button
                onClick={handlePlaceOrder}
                // disabled={!facility}
                className="w-40"
              >
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" size={24} />
                    Ordering...
                  </>
                ) : (
                  "Place order"
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      case 4: // Success step
        return (
          <Card className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="mb-2">Appointment Confirmed!</h1>
            <p>
              Your order from {facility?.name}
              on {format(orderDate!, "PPP")} has been successfully booked.
            </p>
            <Button onClick={resetAndClose} className="mt-6">
              Done
            </Button>
          </Card>
        );
      default:
        return null;
    }
  };

  return <div className="sm:max-w-[425px] mx-auto">{renderStepContent()}</div>;
}
