import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
}

const ProjectImage = ({ src, alt }: ProjectImageProps) => {
  return (
    <div className="overflow-hidden">
      <Image
        src={src || "/placeholder.jpeg"}
        alt={alt}
        width={800}
        height={600}
        className="w-full h-96 object-cover"
      />
    </div>
  );
};

export default ProjectImage;
