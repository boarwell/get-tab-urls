import { FunctionComponent, h } from "preact";

type Prop = Readonly<{
  urls: readonly string[];
}>;

const Entry: FunctionComponent<{ url: string }> = ({ url }) => {
  return <li class="urls__entry">{url}</li>;
};

export const URLs: FunctionComponent<Prop> = ({ urls }) => {
  return (
    <ul class="urls">
      {urls.map((url) => (
        <Entry url={url} />
      ))}
    </ul>
  );
};
