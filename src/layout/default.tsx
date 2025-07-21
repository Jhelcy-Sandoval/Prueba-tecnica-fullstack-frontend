import Sidebar from "../components/sidebar";

interface DefaultLayoutProps {
  children: React.ReactNode;
  mode: boolean;
}

export default function DefaultLayout({ children, mode }: DefaultLayoutProps) {
  return (
    <div className="d-flex flex-row">
      <section
        className="position-sticky top-0 overflow-auto vh-100"
        style={{ width: '250px', flexShrink: 0 }}
      >
        <Sidebar mode={mode}/>
      </section>

      <section className="flex-grow-1 p-4">
        <main>
          {children}
        </main>
      </section>
    </div>
  );
}
