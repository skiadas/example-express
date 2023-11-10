export type GenreType = { id: number, name: string };

export default function Genre({id, name, onSelect }: {id: number, name: string, onSelect: (id: number) => void}) {
  return <li>
    <a href="#" onClick={(ev) => {
      onSelect(id)
      ev.preventDefault();
      }}>{name}</a>
  </li>;
}
