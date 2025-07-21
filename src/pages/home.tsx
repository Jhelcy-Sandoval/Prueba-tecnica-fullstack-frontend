import DefaultLayout from "../layout/default";

interface HomePageProps {
  mode: boolean;
}

export function HomePage({ mode }: HomePageProps) {
  return (
    <DefaultLayout mode={mode}>
      <h1>{mode ? "🌙 Dark Mode" : "☀️ Light Mode"}</h1>
    </DefaultLayout>
  );
}
