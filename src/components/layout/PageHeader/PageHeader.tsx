interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
    </div>
  );
}
