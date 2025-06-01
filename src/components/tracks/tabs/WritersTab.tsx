interface WritersTabProps {
  writers: string[];
}

export function WritersTab({ writers }: WritersTabProps) {
  return (
    <ul className="space-y-2 p-4">
      {writers.map((writer) => (
        <li key={writer} className="text-sm">
          {writer}
        </li>
      ))}
    </ul>
  );
}