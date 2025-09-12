// src/utils/normalizeCartItem.js
export const normalizeCartItem = (item) => {
  return {
    //  ID normalize karo (_id ya id dono se handle)
    _id: item._id || item.id || item.productId || "unknown",

    //  Title normalize karo
    title: item.title || item.name || item.productName || "Untitled",

    //  Price normalize karo
    price: Number(
      item.price ||
      item.discountPrice ||
      item.offerPrice ||
      item.mrp ||
      item.cost ||
      0
    ),

    //  Image normalize karo
    image:
      typeof item.image === "string"
        ? item.image
        : item.image?.url ||
          item.images?.[0]?.url ||
          item.images?.[0] ||
          item.thumbnail ||
          "/placeholder.png",

    //  Quantity default 1 rakho
    quantity: item.quantity || 1,
  };
};

