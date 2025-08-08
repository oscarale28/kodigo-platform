
const LandingSectionTitle = ({ text }: { text: string }) => {
  return (
    <span className="bg-gradient-to-r from-accent-foreground via-primary to-accent-foreground bg-clip-text text-transparent">
      {text}
    </span>
  )
}

export default LandingSectionTitle