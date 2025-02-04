import ContrastBlock from "@components/ContrastBlock.tsx"
import Container from "@components/Container"
import Button from "@components/Button"
import Divider from "@components/Divider"
import FileInput from "@components/FileInput"
import Spinner from "@components/Spinner"

const Test = () => (
  <Container title="My Components">
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button color="zinc" size="small">click me</Button> 
        <Button color="zinc" size="small" disabled>click me</Button> 
      </div>
      <div className="flex gap-2">
        <Button color="zinc2" size="small">click me</Button> 
        <Button color="zinc2" size="small" disabled>click me</Button> 
      </div>
      <div className="flex gap-2">
        <Button color="yellow" size="small">click me</Button> 
        <Button color="yellow" size="small" disabled>click me</Button> 
      </div>
      <div className="flex gap-2">
        <Button color="white" size="small">click me</Button> 
        <Button color="white" size="small" disabled>click me</Button> 
      </div>
      <Divider />
      <FileInput />
      <Divider />
      <Spinner />
    </div>
  </Container>
);

export default Test;
