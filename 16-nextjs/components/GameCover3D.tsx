interface GameCover3DProps {
  title: string;
  coverUrl: string;
}

export default function GameCover3D({ title, coverUrl }: GameCover3DProps) {
  return (
    <div className="hover-3d">
      <figure className="h-[360px] w-60 overflow-hidden rounded-2xl">
        <img
          src={coverUrl}
          alt={`${title} cover`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
