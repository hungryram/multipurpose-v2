export default function IdxLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section id="idx">
        {children}
      </section>
    )
  }