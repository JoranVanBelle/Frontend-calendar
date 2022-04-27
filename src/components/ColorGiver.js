export default function decideColor(type) {
    if (type.toLowerCase() === "werk") return "bg-blue-200";
    if (type.toLowerCase() === "school") return "bg-yellow-200";
    return "bg-green-200";
  }
