"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useModelingContext } from "@/context/ModelingContext";
import { UnitType } from "@/core/types/ModelDataType";

// 단위 선택 옵션
const units = [
  { value: "cm", label: "Centimeters (cm)" },
  { value: "mm", label: "Millimeters (mm)" },
  { value: "inch", label: "Inches (inch)" },
  { value: "ft", label: "Feet (ft)" },
];

export function UnitBox() {
  const { unit, convertToUnit } = useModelingContext(); // Context 사용
  const [open, setOpen] = React.useState(false); // Popover 열림 상태

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {unit ? units.find((u) => u.value === unit)?.label : "Select unit..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No unit found.</CommandEmpty>
            <CommandGroup>
              {units.map((u) => (
                <CommandItem
                  key={u.value}
                  value={u.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== unit) {
                      convertToUnit(currentValue as UnitType);
                    }
                    setOpen(false);
                  }}
                >
                  {u.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      unit === u.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
