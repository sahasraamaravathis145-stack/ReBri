
let listings = [];

export const createListing = (req, res) => {
  const {
    sellerId,
    materialName,
    category,
    quantity,
    unit,
    condition,
    locationName,
  } = req.body;

  if (
    !sellerId ||
    typeof materialName !== "string" ||
    !materialName.trim() ||
    !category ||
    quantity === undefined ||
    quantity === null ||
    !unit ||
    !condition ||
    !locationName ||
    !Number.isFinite(Number(quantity)) ||
    Number(quantity) <= 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields with valid values",
    });
  }

  const newListing = {
    id: Date.now().toString(),
    ...req.body,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  listings.push(newListing);

  res.status(201).json({
    success: true,
    message: "Listing created successfully",
    data: newListing,
  });
};

export const getAllListings = (req, res) => {
  res.status(200).json({
    success: true,
    count: listings.length,
    data: listings,
  });
};

export const getListingById = (req, res) => {
  const listing = listings.find(
    (item) => item.id === req.params.id
  );

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  res.status(200).json({
    success: true,
    data: listing,
  });
};

export const updateListing = (req, res) => {
  const listingIndex = listings.findIndex(
    (item) => item.id === req.params.id
  );

  if (listingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  const allowedFields = [
    "materialName",
    "category",
    "quantity",
    "unit",
    "condition",
    "price",
    "locationName",
    "latitude",
    "longitude",
    "description",
  ];

  const invalidFields = Object.keys(req.body).filter(
    (key) => !allowedFields.includes(key)
  );

  if (invalidFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "You cannot update these fields",
      invalidFields,
    });
  }

  const { quantity, materialName } = req.body;

  if (
    (quantity !== undefined &&
      (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0)) ||
    (materialName !== undefined &&
      (typeof materialName !== "string" || !materialName.trim()))
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid listing details",
    });
  }

  listings[listingIndex] = {
    ...listings[listingIndex],
    ...req.body,
    id: listings[listingIndex].id,
    updatedAt: new Date(),
  };

  res.status(200).json({
    success: true,
    message: "Listing updated successfully",
    data: listings[listingIndex],
  });
};

export const updateListingAvailability = (req, res) => {
  const listing = listings.find(
    (item) => item.id === req.params.id
  );

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found",
    });
  }

  if (typeof req.body.isAvailable !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isAvailable must be a boolean value",
    });
  }

  listing.isAvailable = req.body.isAvailable;
  listing.updatedAt = new Date();

  res.status(200).json({
    success: true,
    message: "Listing availability updated successfully",
    data: listing,
  });
};
