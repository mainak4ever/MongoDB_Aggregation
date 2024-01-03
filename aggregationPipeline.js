// Find no of active users

[
  {
    $match: {
      isActive: true,
    },
  },
  {
    $count: "ActiveUsers",
  },
][
  // find top 5 most favorite fruits

  ({
    $group: {
      _id: "$favoriteFruit",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 5,
  })
][
  // find average age of all users.

  {
    $group: {
      _id: null,
      averageAge: {
        $avg: "$age",
      },
    },
  }
][
  // which country has the highest no of users.

  ({
    $group: {
      _id: "$company.location.country",
      userCount: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      userCount: -1,
    },
  },
  {
    $limit: 1,
  })
][
  // List all unique eye colors

  {
    $group: {
      _id: "$eyeColor",
    },
  }
][
  // find average no. of tags per User

  ({
    $unwind: "$tags",
  },
  {
    $group: {
      _id: "$_id",
      tagsPerUser: {
        $sum: 1,
      },
    },
  },
  {
    $group: {
      _id: null,
      AvgTagsPerUser: {
        $avg: "$tagsPerUser",
      },
    },
  })
];

//OR

[
  {
    $addFields: {
      noOfTags: {
        $size: { $ifNull: ["$tags", []] },
      },
    },
  },
  {
    $group: {
      _id: null,
      avgNoTags: {
        $avg: "$noOfTags",
      },
    },
  },
];

// How many users have "enim" as their tag ?

[
  {
    $match: {
      tags: "enim",
    },
  },
  {
    $count: "NoOfTags",
  },
];

// Give Name and age of all the users with tag as velit and isActive False

[
  {
    $match: {
      tags: "velit",
      isActive: false,
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
];

// How many users have a phone no. starting with '+1 (940)'

[
  {
    $match: {
      "company.phone": /^\+1 \(940\)/,
    },
  },
  {
    $count: "User With +1 (940)",
  },
];

// Find first 4 users who registered recently

[
  {
    $sort: {
      registered: -1,
    },
  },
  {
    $project: {
      name: 1,
      age: 1,
    },
  },
  {
    $limit: 4,
  },
];

// Categorize users by their favorite food

[
  {
    $group: {
      _id: "$favoriteFruit",
      users: {
        $push: "$name",
      },
    },
  },
][
  // How many users have "ad" as their second tag

  ({
    $match: {
      "tags.1": "ad",
    },
  },
  {
    $count: "secondTagAd",
  })
];

// Find users who have both 'enim and "id as tags"

[
  {
    $match: {
      tags: {
        $all: ["id", "enim"],
      },
    },
  },
][
  // List all companies location in the USA with their corresponding user count

  ({
    $match: {
      "company.location.country": "USA",
    },
  },
  {
    $group: {
      _id: "$company.title",
      userCount: {
        $sum: 1,
      },
    },
  })
];

// look ups

ref: "youtube clone project -> user.controllers";

// lookups with this models

[
  {
    $lookup: {
      from: "authors",
      localField: "author_id",
      foreignField: "_id",
      as: "author_details",
    },
  },
  {
    $addFields: {
      author_details: {
        $arrayElemAt: ["$author_details", 0],
      },
    },
  },
];
