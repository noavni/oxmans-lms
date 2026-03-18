import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.progress.deleteMany();
  await prisma.purchase.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Create demo users
  const hashedPassword = await bcryptjs.hash("password123", 12);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@oxmans.com",
      name: "Dr. Oxman",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: "Sarah Cohen",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  console.log("Created users:", adminUser.email, studentUser.email);

  // ── Course 1: Secondary ────────────────────────────────────────────────────
  const course1 = await prisma.course.create({
    data: {
      title: "Foundations of Algebra & Trigonometry",
      slug: "foundations-algebra-trigonometry",
      description:
        "Master the core algebraic structures and trigonometric identities that underpin all of higher mathematics.",
      longDescription:
        "This course builds the essential mathematical foundations every student needs before tackling university-level content. We begin with a rigorous treatment of polynomial algebra, progressing through rational functions, exponentials, and logarithms.\n\nIn the second half of the course, we develop trigonometry from first principles — starting with the unit circle, working through all major identities, and building up to solving complex trigonometric equations.\n\nBy the end, students will have the algebraic fluency and trigonometric confidence to succeed in calculus and beyond.",
      price: 0,
      currency: "ILS",
      level: "BEGINNER",
      isPublished: true,
      thumbnail: null,
    },
  });

  await createChaptersForCourse(course1.id, [
    {
      title: "Algebraic Foundations",
      position: 1,
      lessons: [
        {
          title: "Introduction & Course Overview",
          description:
            "Welcome to the course. We cover what you will learn, how the course is structured, and what prerequisites you need.\n\nThis is a free preview lesson — watch it before deciding to enroll.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 480,
          position: 1,
          isFree: true,
        },
        {
          title: "Polynomial Arithmetic",
          description:
            "Addition, subtraction, multiplication, and division of polynomials. We cover long division and synthetic division with worked examples.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 1320,
          position: 2,
          isFree: false,
        },
        {
          title: "Factoring Techniques",
          description:
            "Complete guide to factoring: GCF, difference of squares, trinomials, sum/difference of cubes, and grouping.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 1560,
          position: 3,
          isFree: false,
        },
        {
          title: "Rational Expressions & Equations",
          description:
            "Simplifying, multiplying, dividing, adding, and subtracting rational expressions. Solving rational equations and checking for extraneous solutions.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 1440,
          position: 4,
          isFree: false,
        },
      ],
    },
    {
      title: "Exponentials & Logarithms",
      position: 2,
      lessons: [
        {
          title: "Exponential Functions & Their Graphs",
          description:
            "Understanding exponential growth and decay. Graphing y = aˣ, transformations, and the natural exponential e.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          duration: 1200,
          position: 1,
          isFree: false,
        },
        {
          title: "Logarithms: Definition & Properties",
          description:
            "Defining logarithms as inverses of exponentials. The product, quotient, and power rules. Change of base formula.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          duration: 1380,
          position: 2,
          isFree: false,
        },
        {
          title: "Exponential & Logarithmic Equations",
          description:
            "Solving equations involving exponentials and logarithms. Applications to compound interest and radioactive decay.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          duration: 1260,
          position: 3,
          isFree: false,
        },
      ],
    },
    {
      title: "Trigonometry",
      position: 3,
      lessons: [
        {
          title: "The Unit Circle",
          description:
            "Building trigonometry from the unit circle definition. Degrees vs radians, special angles, and all six trig functions.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
          duration: 1500,
          position: 1,
          isFree: false,
        },
        {
          title: "Trigonometric Identities",
          description:
            "Pythagorean identities, co-function identities, even/odd identities. Double-angle and half-angle formulas derived from first principles.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 1680,
          position: 2,
          isFree: false,
        },
        {
          title: "Solving Trigonometric Equations",
          description:
            "General and principal solutions. Using identities to simplify equations before solving.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 1320,
          position: 3,
          isFree: false,
        },
      ],
    },
  ]);

  // ── Course 2: A-Level ──────────────────────────────────────────────────────
  const course2 = await prisma.course.create({
    data: {
      title: "A-Level Calculus: Differentiation & Integration",
      slug: "a-level-calculus",
      description:
        "A complete A-Level calculus course covering limits, differentiation, integration, and their real-world applications.",
      longDescription:
        "Built for A-Level students and those preparing for university entrance, this course takes a rigorous approach to calculus without sacrificing intuition.\n\nWe start with the epsilon-delta definition of limits and continuity, then develop differentiation from first principles. After mastering all differentiation techniques — including implicit differentiation and related rates — we turn to integration.\n\nThe course concludes with the Fundamental Theorem of Calculus and a thorough treatment of integration techniques, including substitution, integration by parts, and partial fractions.",
      price: 29900,
      currency: "ILS",
      level: "INTERMEDIATE",
      isPublished: true,
      thumbnail: null,
    },
  });

  await createChaptersForCourse(course2.id, [
    {
      title: "Limits & Continuity",
      position: 1,
      lessons: [
        {
          title: "Introduction to Limits",
          description:
            "Intuitive approach to limits. One-sided limits, the limit laws, and the Squeeze Theorem. Free preview lesson.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 900,
          position: 1,
          isFree: true,
        },
        {
          title: "Epsilon-Delta Definition",
          description:
            "Formalizing the limit concept with the epsilon-delta definition. Proving limits rigorously with worked examples.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 1800,
          position: 2,
          isFree: false,
        },
        {
          title: "Continuity & Discontinuities",
          description:
            "Classifying discontinuities, the Intermediate Value Theorem, and the Extreme Value Theorem.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          duration: 1440,
          position: 3,
          isFree: false,
        },
      ],
    },
    {
      title: "Differentiation",
      position: 2,
      lessons: [
        {
          title: "Differentiation from First Principles",
          description:
            "The derivative as the limit of the difference quotient. Proving derivative formulas for xⁿ, sin(x), and eˣ.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          duration: 1620,
          position: 1,
          isFree: false,
        },
        {
          title: "Product, Quotient & Chain Rules",
          description:
            "Deriving and applying the three fundamental differentiation rules with extensive practice problems.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          duration: 2100,
          position: 2,
          isFree: false,
        },
        {
          title: "Implicit Differentiation & Related Rates",
          description:
            "Differentiating implicitly defined functions. Setting up and solving related rates problems.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
          duration: 1800,
          position: 3,
          isFree: false,
        },
        {
          title: "Applications: Optimization",
          description:
            "Using calculus to find maxima and minima. The first and second derivative tests, and applied optimization problems.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 1980,
          position: 4,
          isFree: false,
        },
      ],
    },
    {
      title: "Integration",
      position: 3,
      lessons: [
        {
          title: "The Definite Integral & Riemann Sums",
          description:
            "Building integration from Riemann sums. The definite integral as area. Properties of the integral.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 1620,
          position: 1,
          isFree: false,
        },
        {
          title: "The Fundamental Theorem of Calculus",
          description:
            "Connecting differentiation and integration. Both parts of the FTC proved and applied.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 1980,
          position: 2,
          isFree: false,
        },
        {
          title: "Integration Techniques",
          description:
            "U-substitution, integration by parts, trigonometric substitution, and partial fractions — all in one comprehensive lesson.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 2700,
          position: 3,
          isFree: false,
        },
      ],
    },
  ]);

  // ── Course 3: University ────────────────────────────────────────────────────
  const course3 = await prisma.course.create({
    data: {
      title: "Linear Algebra: Vectors, Matrices & Transformations",
      slug: "linear-algebra",
      description:
        "University-level linear algebra — from vector spaces and linear transformations to eigenvalues and the spectral theorem.",
      longDescription:
        "This is the definitive course on university linear algebra. We take a modern, abstract approach: starting with vector spaces and linear transformations before introducing matrices as their coordinate representations.\n\nThe course covers all major topics in a first university linear algebra course: systems of equations, determinants, eigenvalues and eigenvectors, orthogonality, and inner product spaces.\n\nSpecial attention is given to the geometric interpretation of each algebraic concept — you will understand not just how to compute, but why each algorithm works.",
      price: 49900,
      currency: "ILS",
      level: "ADVANCED",
      isPublished: true,
      thumbnail: null,
    },
  });

  await createChaptersForCourse(course3.id, [
    {
      title: "Vector Spaces & Subspaces",
      position: 1,
      lessons: [
        {
          title: "What is a Vector Space?",
          description:
            "The abstract definition of a vector space. Verifying the axioms. Examples from Rⁿ, polynomial spaces, and function spaces. Free preview.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          duration: 1200,
          position: 1,
          isFree: true,
        },
        {
          title: "Subspaces, Span & Linear Independence",
          description:
            "Subspace criteria, the span of a set of vectors, linear dependence and independence. The definition and uniqueness of bases.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          duration: 2100,
          position: 2,
          isFree: false,
        },
        {
          title: "Dimension & the Rank-Nullity Theorem",
          description:
            "Proving that all bases of a finite-dimensional space have the same cardinality. The rank-nullity theorem with applications.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          duration: 1860,
          position: 3,
          isFree: false,
        },
      ],
    },
    {
      title: "Linear Transformations & Matrices",
      position: 2,
      lessons: [
        {
          title: "Linear Transformations",
          description:
            "Definition, examples, and the kernel and image. Every linear map between finite-dimensional spaces is represented by a matrix.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
          duration: 2040,
          position: 1,
          isFree: false,
        },
        {
          title: "Matrix Operations & Inverses",
          description:
            "Matrix multiplication, transpose, inverse. Gaussian elimination and the LU decomposition.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 2400,
          position: 2,
          isFree: false,
        },
        {
          title: "Determinants",
          description:
            "Axiomatic and cofactor expansion definitions of the determinant. Properties, geometric interpretation, and Cramer's rule.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 2160,
          position: 3,
          isFree: false,
        },
        {
          title: "Change of Basis",
          description:
            "Coordinate vectors, change-of-basis matrices, and how the matrix of a linear transformation changes under a change of basis.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 1980,
          position: 4,
          isFree: false,
        },
      ],
    },
    {
      title: "Eigenvalues & Inner Products",
      position: 3,
      lessons: [
        {
          title: "Eigenvalues & Eigenvectors",
          description:
            "The characteristic polynomial, finding eigenspaces, algebraic vs geometric multiplicity. Diagonalization criterion.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 2520,
          position: 1,
          isFree: false,
        },
        {
          title: "Inner Product Spaces & Orthogonality",
          description:
            "Inner products, norms, orthogonal complements. The Gram-Schmidt process. Orthogonal projection formula.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          duration: 2280,
          position: 2,
          isFree: false,
        },
        {
          title: "The Spectral Theorem",
          description:
            "Symmetric matrices have real eigenvalues and an orthonormal basis of eigenvectors. The spectral decomposition and its applications.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          duration: 2640,
          position: 3,
          isFree: false,
        },
      ],
    },
  ]);

  // ── Course 4: Competition ───────────────────────────────────────────────────
  const course4 = await prisma.course.create({
    data: {
      title: "Mathematical Olympiad Problem Solving",
      slug: "olympiad-problem-solving",
      description:
        "Competition mathematics at the highest level — combinatorics, number theory, geometry, and advanced inequalities for olympiad preparation.",
      longDescription:
        "This course is designed for students preparing for the International Mathematical Olympiad (IMO) and national-level competitions. Each topic is taught through carefully chosen problems that reveal deep mathematical structure.\n\nThe course is organized around four pillars of competition mathematics: combinatorics, number theory, geometry, and inequalities. Rather than presenting theory for its own sake, we develop each tool in the context of solving real olympiad problems.\n\nBy working through over 150 problems from past olympiads, students will develop the mathematical maturity and problem-solving instinct needed to compete at the highest level.",
      price: 79900,
      currency: "ILS",
      level: "ADVANCED",
      isPublished: true,
      thumbnail: null,
    },
  });

  await createChaptersForCourse(course4.id, [
    {
      title: "Combinatorics",
      position: 1,
      lessons: [
        {
          title: "Counting: Principles & Techniques",
          description:
            "The addition and multiplication principles, bijections, and the pigeonhole principle. Free preview lesson with three olympiad problems.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          duration: 1800,
          position: 1,
          isFree: true,
        },
        {
          title: "Combinatorial Identities & Generating Functions",
          description:
            "Pascal's triangle, Vandermonde's identity, and the binomial theorem. Introduction to generating functions as a unifying framework.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
          duration: 2340,
          position: 2,
          isFree: false,
        },
        {
          title: "Graph Theory for Competitions",
          description:
            "Graphs, trees, Euler paths, Hamiltonian cycles. Extremal graph theory and Ramsey theory at competition level.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          duration: 2580,
          position: 3,
          isFree: false,
        },
      ],
    },
    {
      title: "Number Theory",
      position: 2,
      lessons: [
        {
          title: "Divisibility & the Euclidean Algorithm",
          description:
            "GCD, LCM, the extended Euclidean algorithm, and Bezout's identity. Applications to solving linear Diophantine equations.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          duration: 1980,
          position: 1,
          isFree: false,
        },
        {
          title: "Modular Arithmetic & Congruences",
          description:
            "Congruence classes, Fermat's Little Theorem, Euler's theorem, and the Chinese Remainder Theorem.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          duration: 2520,
          position: 2,
          isFree: false,
        },
        {
          title: "Quadratic Residues & p-adic Valuations",
          description:
            "Legendre symbols, Euler's criterion, Gaussian integers introduction, and the p-adic valuation.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
          duration: 2760,
          position: 3,
          isFree: false,
        },
      ],
    },
    {
      title: "Inequalities & Geometry",
      position: 3,
      lessons: [
        {
          title: "Classical Inequalities: AM-GM, Cauchy-Schwarz, Jensen",
          description:
            "Proofs and olympiad applications of the three most important inequalities. Strategy for choosing the right inequality.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
          duration: 2700,
          position: 1,
          isFree: false,
        },
        {
          title: "Olympiad Geometry: Circles & Triangles",
          description:
            "Power of a point, radical axes, the nine-point circle, Menelaus and Ceva theorems.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
          duration: 3000,
          position: 2,
          isFree: false,
        },
        {
          title: "Projective & Inversive Techniques",
          description:
            "Projective geometry basics, cross-ratio, harmonic conjugates. Inversion as a problem-solving tool.",
          videoUrl:
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
          duration: 3240,
          position: 3,
          isFree: false,
        },
      ],
    },
  ]);

  // Give student user a purchase of the free course
  await prisma.purchase.create({
    data: {
      userId: studentUser.id,
      courseId: course1.id,
    },
  });

  // Give student some progress
  const freeCourse = await prisma.course.findUnique({
    where: { id: course1.id },
    include: { chapters: { include: { lessons: true }, orderBy: { position: "asc" } } },
  });

  if (freeCourse) {
    const firstLesson = freeCourse.chapters[0]?.lessons[0];
    if (firstLesson) {
      await prisma.progress.create({
        data: {
          userId: studentUser.id,
          lessonId: firstLesson.id,
          completed: true,
        },
      });
    }
  }

  console.log("Seed complete!");
  console.log("Demo credentials:");
  console.log("  Admin: admin@oxmans.com / password123");
  console.log("  Student: student@example.com / password123");
}

async function createChaptersForCourse(
  courseId: string,
  chapters: {
    title: string;
    position: number;
    lessons: {
      title: string;
      description: string;
      videoUrl: string;
      duration: number;
      position: number;
      isFree: boolean;
    }[];
  }[]
) {
  for (const chapter of chapters) {
    const createdChapter = await prisma.chapter.create({
      data: {
        courseId,
        title: chapter.title,
        position: chapter.position,
      },
    });

    for (const lesson of chapter.lessons) {
      await prisma.lesson.create({
        data: {
          chapterId: createdChapter.id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
          duration: lesson.duration,
          position: lesson.position,
          isFree: lesson.isFree,
        },
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
