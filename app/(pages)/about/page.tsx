import Image from "next/image";

const About = () => {
  return (
    <main className="flex flex-col items-center w-full mt-2 justify-center gap-4">
      <Image
        src="/profile-img.jpeg"
        alt="profile image"
        width={200}
        height={200}
        className="rounded-full mt-4"
      />
      <div className="flex flex-col gap-1 ư-full md:w-[70%] font-light bg-input-field-gray p-5">
        <h1 className="font-lilita-one text-3xl">About</h1>
        <div className="bg-white w-full h-[2px]"></div>
        <h2 className="text-xl mt-4"> 💬 About RandomWebtoon</h2>
        <p>
          Hi, I’m Viet (VDuck) — a developer who loves stories, comics, and
          coding. I built RandomWebtoon as a fun side project to combine my
          interest in webtoons with my curiosity about tech like Next.js, Redux,
          and GraphQL.
        </p>
        <p>
          {" "}
          There are so many webtoons out there — but sometimes, it’s hard to
          know what to read next. I wanted to create something simple that lets
          people discover new webtoons, either completely at random or based on
          their preferences. That’s what this site does.
        </p>

        <h2 className="text-xl mt-4">Why I Made This</h2>
        <p>
          To practice using Next.js 15, Firebase, Redux Toolkit, and GraphQL API
          in a real project. To make something small but useful. To explore what
          I enjoy — clean UI, data, and storytelling.
        </p>

        <h2 className="text-xl mt-4">What It Does</h2>
        <p>
          You can generate random webtoons (fully random or filtered by genre).
          You can save your favourites (if you log in). You can spin a wheel,
          search titles, and eventually talk to a bot that recommends similar
          series (yes, I'm working on it).
        </p>
        <p className="mt-2">
          I’m still adding features and polishing things. It’s not perfect, but
          that’s okay — this project is about learning and sharing.
        </p>
        <p> Thanks for checking it out ✌️</p>
      </div>
    </main>
  );
};

export default About;
