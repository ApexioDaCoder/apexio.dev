import { useDeno } from "aleph/react";
import React from "react";
import Logo from "~/components/logo.tsx";
import useCounter from "~/lib/useCounter.ts";
import FlipNumbers from "react-flip-numbers";

export default function Home() {
  const [count, isSyncing, increase, decrease] = useCounter();
  const version = useDeno(() => Deno.version.deno);

  return (
    <div className="page">
      <head>
        <title>Hello World - apexio.dev</title>
        <link rel="stylesheet" href="../style/index.css" />
        <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      </head>
      <p className="logo">
        <Logo />
      </p>
      <h1>
        Welcome to <strong>apexio.dev</strong>!
      </h1>
      <div className="counter">
        <span>Counter:</span>
        {isSyncing && <em>...</em>}
        {!isSyncing && (
          <strong>
            <FlipNumbers
              height={12}
              width={12}
              color="white"
              play
              perspective={100}
              numbers={count.toString()}
            />
          </strong>
        )}
        <button onClick={decrease}>-</button>
        <button onClick={increase}>+</button>
      </div>
      <p className="copyinfo">Built by Aleph.js in Deno {version}</p>
    </div>
  );
}
