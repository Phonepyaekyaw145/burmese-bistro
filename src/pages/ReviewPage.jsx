import ReviewForm from "../components/review/ReviewForm";

export default function ReviewPage() {
  return (
    <div
      className="flex flex-col flex-1 overflow-y-auto"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full px-7 md:px-9 pt-7 pb-4">
        <div
          className="font-bold text-[28px] mb-1.5"
          style={{ fontFamily: "var(--ff)", color: "var(--tx)" }}
        >
          Leave a Review
        </div>
        <div
          className="text-[13px] leading-relaxed mb-6"
          style={{ color: "var(--mt)" }}
        >
          Share your experience — our AI will analyze it and the owner will
          personally reply.
        </div>
        <ReviewForm />
      </div>
    </div>
  );
}
