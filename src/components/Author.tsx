import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Promoting myself
const {name, avatar, ...socials} = {
  "avatar": "https://avatars.githubusercontent.com/u/43708848", "name": "Andrii Iv. (@digitalandyeu)", "mail": "job@digitalandy.eu", "github": "https://github.com/andriilive", "telegram": "https://t.me/digitalandyeu", "linkedin": "https://www.linkedin.com/in/andyivashchuk"
} as const;

export default function Author() {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={avatar}/>
            <AvatarFallback className="text-black">AI</AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-left">
            <h1 className="text-sm font-medium text-black">{name}</h1>
            <a href={`mailto:${socials.mail}`} className="text-xs text-orange-500">{socials.mail}</a>
          </div>
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-[250px]">
      {Object.entries(socials).map(([name, href]) => (
        <DropdownMenuItem key={name} asChild>
        <a href={name === 'mail' ? 'mailto:' + href : href} target={name === 'mail' ? undefined : '_blank'} rel="me">{name.charAt(0).toUpperCase() + name.slice(1)}</a>
      </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}
