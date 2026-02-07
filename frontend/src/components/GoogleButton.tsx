import { Button } from "@/components/ui/button";

export function GoogleButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="outline"
      className="w-full flex items-center justify-center gap-3 h-11"
    >
      {!loading && (
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          className="h-5 w-5"
        />
      )}
      {loading ? "Signing in…" : "Continue with Google"}
    </Button>
  );
}
