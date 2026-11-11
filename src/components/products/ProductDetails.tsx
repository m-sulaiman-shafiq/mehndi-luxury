"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Ruler, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/data/products";

type StitchingOption = "unstitched" | "stitched";

const measurementFields = [
  { name: "Bust", key: "bust" },
  { name: "Waist", key: "waist" },
  { name: "Hips", key: "hips" },
  { name: "Shoulder", key: "shoulder" },
  { name: "Shirt length", key: "shirtLength" },
  { name: "Sleeve length", key: "sleeveLength" },
  { name: "Armhole", key: "armhole" },
  { name: "Wrist / cuff", key: "wrist" },
  { name: "Trouser waist", key: "trouserWaist" },
  { name: "Trouser hips", key: "trouserHips" },
  { name: "Trouser length", key: "trouserLength" },
] as const;

type MeasurementKey = (typeof measurementFields)[number]["key"];

type Measurements = Record<MeasurementKey, string>;

const emptyMeasurements: Measurements = {
  bust: "",
  waist: "",
  hips: "",
  shoulder: "",
  shirtLength: "",
  sleeveLength: "",
  armhole: "",
  wrist: "",
  trouserWaist: "",
  trouserHips: "",
  trouserLength: "",
};

export default function ProductDetails({ product }: { product: Product }) {
  const [stitching, setStitching] = useState<StitchingOption>("unstitched");
  const [quantity, setQuantity] = useState(1);
  const [showMeasurements, setShowMeasurements] = useState(false);
  const [age, setAge] = useState("");
  const [measurements, setMeasurements] =
    useState<Measurements>(emptyMeasurements);
  const [measurementsSaved, setMeasurementsSaved] = useState(false);
  const [message, setMessage] = useState("");

  const price = product.price.toLocaleString("en-PK");

  function selectStitching(option: StitchingOption) {
    setStitching(option);
    setMessage("");

    if (option === "stitched") {
      setMeasurementsSaved(false);
      setShowMeasurements(true);
    } else {
      setMeasurementsSaved(false);
      setAge("");
      setMeasurements(emptyMeasurements);
      setShowMeasurements(false);
    }
  }

  function saveMeasurements(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMeasurementsSaved(true);
    setShowMeasurements(false);
    setMessage("");
  }

  function addToBag() {
    if (stitching === "stitched" && !measurementsSaved) {
      setShowMeasurements(true);
      setMessage("Please complete and save your measurements first.");
      return;
    }

    const newItem = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image,
      stitching,
      age: stitching === "stitched" ? Number(age) : null,
      measurements: stitching === "stitched" ? measurements : null,
      quantity,
    };

    try {
      const existingCart = JSON.parse(
        localStorage.getItem("mehndi-cart") || "[]",
      );

      localStorage.setItem(
        "mehndi-cart",
        JSON.stringify([...existingCart, newItem]),
      );

      setMessage("Added to your bag successfully.");
    } catch {
      setMessage("We couldn't update your bag. Please try again.");
    }
  }

  return (
    <>
      <main className="min-h-screen bg-[#FFF9E9] py-8 md:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#77704E] transition hover:text-[#59402F]"
          >
            <ArrowLeft size={16} />
            Back to collection
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#F0E8D9]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.madeToOrder && (
                <span className="absolute left-5 top-5 rounded-full bg-[#FFF9E9]/95 px-4 py-2 text-xs font-medium text-[#59402F]">
                  Made to order
                </span>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A17B45]">
                {product.category} Collection
              </p>

              <h1 className="mt-4 text-4xl leading-tight text-[#59402F] md:text-5xl">
                {product.name}
              </h1>

              <p className="mt-5 text-2xl font-semibold text-[#59402F]">
                PKR {price}
              </p>

              <p className="mt-6 max-w-xl leading-8 text-[#77704E]">
                {product.description}
              </p>

              <div className="my-8 border-t border-[#EADFCB]" />

              <div>
                <h2 className="text-sm font-semibold text-[#59402F]">
                  Choose your stitching option
                </h2>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => selectStitching("unstitched")}
                    className={`rounded-xl border p-4 text-left transition ${
                      stitching === "unstitched"
                        ? "border-[#D9A94D] bg-[#FFF0D0]"
                        : "border-[#EADFCB] bg-white hover:border-[#D9A94D]"
                    }`}
                  >
                    <span className="block font-semibold text-[#59402F]">
                      Unstitched
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#77704E]">
                      Fabric and outfit supplied without stitching
                    </span>
                    {stitching === "unstitched" && (
                      <Check className="mt-3 text-[#A17B45]" size={18} />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => selectStitching("stitched")}
                    className={`rounded-xl border p-4 text-left transition ${
                      stitching === "stitched"
                        ? "border-[#D9A94D] bg-[#FFF0D0]"
                        : "border-[#EADFCB] bg-white hover:border-[#D9A94D]"
                    }`}
                  >
                    <span className="block font-semibold text-[#59402F]">
                      Stitched
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-[#77704E]">
                      Tailored using your custom measurements
                    </span>
                    {stitching === "stitched" && (
                      <Check className="mt-3 text-[#A17B45]" size={18} />
                    )}
                  </button>
                </div>
              </div>

              {stitching === "stitched" && (
                <div className="mt-4 rounded-xl border border-[#EADFCB] bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-[#59402F]">
                    <Ruler size={17} />
                    Custom measurements
                  </div>
                  {measurementsSaved ? (
                    <p className="mt-2 text-sm text-[#77704E]">
                      <Check className="mr-1 inline" size={15} />
                      Measurements saved for age {age}.
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-[#77704E]">
                      Please provide the wearer's age and measurements before
                      adding this item to your bag.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowMeasurements(true)}
                    className="mt-3 text-sm font-semibold text-[#A17B45] underline underline-offset-4"
                  >
                    {measurementsSaved
                      ? "Edit measurements"
                      : "Enter measurements"}
                  </button>
                </div>
              )}

              <div className="mt-8">
                <label
                  htmlFor="quantity"
                  className="text-sm font-semibold text-[#59402F]"
                >
                  Quantity
                </label>
                <div className="mt-2 flex h-11 w-32 items-center justify-between rounded-full border border-[#EADFCB] bg-white px-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={addToBag}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(110deg,#F49A62_0%,#F6CE69_50%,#F3A9B5_100%)] px-8 py-4 text-sm font-semibold text-[#59402F] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <ShoppingBag size={18} />
                Add to Bag
              </button>

              {message && (
                <p
                  role="status"
                  className="mt-4 text-center text-sm text-[#77704E]"
                >
                  {message}
                </p>
              )}

              <p className="mt-5 text-center text-xs leading-6 text-[#77704E]">
                Each piece is prepared with care. Made-to-order production
                begins after your order is confirmed.
              </p>
            </div>
          </div>
        </div>
      </main>

      {showMeasurements && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#241B16]/60 p-3 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowMeasurements(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="measurement-title"
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#FFF9E9] shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EADFCB] bg-[#FFF9E9] px-6 py-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A17B45]">
                  Made just for you
                </p>
                <h2
                  id="measurement-title"
                  className="mt-1 text-2xl text-[#59402F]"
                >
                  Custom Measurements
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowMeasurements(false)}
                aria-label="Close measurements"
                className="rounded-full p-2 text-[#59402F] hover:bg-[#F2E8D5]"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={saveMeasurements} className="p-6">
              <p className="mb-6 text-sm leading-6 text-[#77704E]">
                Please enter the wearer's age and measurements accurately. All
                measurements should be provided in inches.
              </p>

              <div className="mb-7">
                <label
                  htmlFor="wearer-age"
                  className="mb-2 block text-sm font-semibold text-[#59402F]"
                >
                  Age of the person wearing the outfit *
                </label>
                <div className="max-w-xs">
                  <input
                    id="wearer-age"
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    placeholder="e.g. 8 or 35"
                    className="w-full rounded-xl border border-[#EADFCB] bg-white px-4 py-3 text-sm text-[#59402F] outline-none focus:border-[#D9A94D] focus:ring-2 focus:ring-[#F6CE69]/30"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-[#59402F]">
                  Body measurements
                </h3>
                <span className="text-xs text-[#77704E]">All in inches</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {measurementFields.map((field) => (
                  <div key={field.key}>
                    <label
                      htmlFor={field.key}
                      className="mb-2 block text-sm text-[#59402F]"
                    >
                      {field.name} *
                    </label>
                    <input
                      id={field.key}
                      type="number"
                      min="1"
                      max="150"
                      step="0.25"
                      required
                      value={measurements[field.key]}
                      onChange={(event) => {
                        setMeasurements((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }));
                      }}
                      placeholder="Measurement in inches"
                      className="w-full rounded-xl border border-[#EADFCB] bg-white px-4 py-3 text-sm text-[#59402F] outline-none focus:border-[#D9A94D] focus:ring-2 focus:ring-[#F6CE69]/30"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl bg-[#F7EEDC] p-4 text-xs leading-6 text-[#77704E]">
                Please measure carefully. If you are unsure how to take a
                measurement, contact us before submitting your order.
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-full bg-[linear-gradient(110deg,#F49A62_0%,#F6CE69_50%,#F3A9B5_100%)] px-6 py-4 text-sm font-semibold text-[#59402F] transition hover:shadow-md"
              >
                Save Measurements
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
