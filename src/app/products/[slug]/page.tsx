"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import Container from "@/components/ui/Container";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Suspense } from "react";

const measurementFields = [
  "Bust",
  "Waist",
  "Hips",
  "Shoulder",
  "Shirt Length",
  "Sleeve Length",
  "Armhole",
  "Wrist / Cuff",
  "Trouser Waist",
  "Trouser Hips",
  "Trouser Length",
];

export default function ProductDetailsContent() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const product = products.find((item) => item.slug === params.slug);

  const [stitching, setStitching] = useState<"unstitched" | "stitched">(
    "unstitched",
  );
  const [measurementOpen, setMeasurementOpen] = useState(false);
  const [age, setAge] = useState("");
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF9E9] flex items-center justify-center">
        <div className="text-center">
          <h1>Product not found</h1>
          <Link href="/shop" className="mt-4 inline-block underline">
            Return to shop
          </Link>
        </div>
      </main>
    );
  }

  function chooseStitched() {
    setStitching("stitched");
    setMeasurementOpen(true);
  }

  function saveMeasurements(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setMeasurementOpen(false);
  }

  function handleAddToBag() {
    if (!product) return;

    if (stitching === "stitched" && !saved) {
      setMeasurementOpen(true);
      return;
    }

    setAdding(true);

    addItem({
      product,
      stitching,
      ...(stitching === "stitched" ? { age, measurements } : {}),
    });

    router.push("/cart");
  }

  return (
    <Suspense>
      <AnnouncementBar />
      <Header />

      <main className="min-h-screen bg-[#FFF9E9] py-12 md:py-20">
        <Container>
          <div className="mb-8 text-sm text-[#77704E]">
            <Link href="/">Home</Link> / <Link href="/shop">Shop</Link> /{" "}
            {product.name}
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A47743]">
                {product.category} Collection
              </p>

              <h1 className="mt-3">{product.name}</h1>

              <p className="mt-4 text-2xl font-semibold text-[#59402F]">
                PKR {product.price.toLocaleString("en-PK")}
              </p>

              <p className="mt-6 leading-8 text-[#77704E]">
                {product.description}
              </p>

              {product.madeToOrder && (
                <p className="mt-5 rounded-lg bg-[#F6CE69]/25 px-4 py-3 text-sm text-[#59402F]">
                  Made to order · Crafted especially for your occasion
                </p>
              )}

              <div className="mt-9">
                <h2 className="text-xl">Choose your stitching</h2>
                <p className="mt-2 text-sm text-[#77704E]">
                  Select how you would like your outfit prepared.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStitching("unstitched");
                      setSaved(false);
                    }}
                    className={`rounded-xl border p-5 text-left transition ${
                      stitching === "unstitched"
                        ? "border-[#D9B96A] bg-[#F6CE69]/20"
                        : "border-[#EADFCB] bg-white"
                    }`}
                  >
                    <span className="block font-semibold">Unstitched</span>
                    <span className="mt-2 block text-sm text-[#77704E]">
                      Receive the fabric without stitching.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={chooseStitched}
                    className={`rounded-xl border p-5 text-left transition ${
                      stitching === "stitched"
                        ? "border-[#D9B96A] bg-[#F6CE69]/20"
                        : "border-[#EADFCB] bg-white"
                    }`}
                  >
                    <span className="block font-semibold">Stitched</span>
                    <span className="mt-2 block text-sm text-[#77704E]">
                      Custom stitching using your measurements.
                    </span>
                  </button>
                </div>

                {stitching === "stitched" && (
                  <div className="mt-4 rounded-xl border border-[#EADFCB] bg-white p-4">
                    <p className="text-sm text-[#59402F]">
                      {saved
                        ? "Your custom measurements have been entered."
                        : "Custom measurements are required for stitched orders."}
                    </p>
                    <button
                      type="button"
                      onClick={() => setMeasurementOpen(true)}
                      className="mt-3 text-sm font-semibold text-[#A47743] underline"
                    >
                      {saved ? "Edit measurements" : "Enter measurements"}
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={adding}
                  className="w-full rounded-full bg-button-gradient px-8 py-4 font-semibold text-[#59402F] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60"
                >
                  {adding ? "Adding to Bag..." : "Add to Bag"}
                </button>
                <p className="mt-3 text-center text-xs text-[#77704E]">
                  Your selected stitching option:{" "}
                  {stitching === "stitched" ? "Stitched" : "Unstitched"}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {measurementOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FFF9E9] p-6 shadow-2xl md:p-9">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A47743]">
                  Custom tailoring
                </p>
                <h2 className="mt-2 text-2xl">Your Measurements</h2>
                <p className="mt-2 text-sm text-[#77704E]">
                  Please enter the wearer's age and measurements in inches.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMeasurementOpen(false)}
                aria-label="Close measurement form"
                className="text-2xl text-[#59402F]"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveMeasurements} className="mt-7">
              <label className="mb-2 block text-sm font-medium">
                Wearer's age *
              </label>
              <input
                type="number"
                min="1"
                max="120"
                required
                value={age}
                onChange={(event) => setAge(event.target.value)}
                placeholder="Enter age in years"
                className="mb-6 w-full rounded-lg border border-[#EADFCB] bg-white px-4 py-3 outline-none focus:border-[#D9B96A]"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {measurementFields.map((field) => (
                  <label key={field} className="block text-sm font-medium">
                    {field} (inches) *
                    <input
                      type="number"
                      min="1"
                      step="0.25"
                      required
                      value={measurements[field] || ""}
                      onChange={(event) =>
                        setMeasurements((current) => ({
                          ...current,
                          [field]: event.target.value,
                        }))
                      }
                      placeholder={`Enter ${field.toLowerCase()}`}
                      className="mt-2 w-full rounded-lg border border-[#EADFCB] bg-white px-4 py-3 font-normal outline-none focus:border-[#D9B96A]"
                    />
                  </label>
                ))}
              </div>

              <p className="mt-5 text-xs leading-6 text-[#77704E]">
                Please use a measuring tape and enter the wearer's actual
                measurements. Our tailoring team can use the age as additional
                context.
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setMeasurementOpen(false)}
                  className="rounded-full border border-[#EADFCB] px-6 py-3 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-full bg-button-gradient px-7 py-3 text-sm font-semibold text-[#59402F]"
                >
                  Save Measurements
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </Suspense>
  );
}
