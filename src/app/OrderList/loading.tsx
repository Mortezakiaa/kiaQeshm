import PageLoader from "@/components/PageLoader";

export default function loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "50%",
        transform: "translate(50%,-50%)",
      }}
    >
      <PageLoader />
    </div>
  );
}
