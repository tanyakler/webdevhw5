defmodule Bulls.Game do

  def new do
    %{
      secret: getRandomNum(),
      guesses: MapSet.new,
    }
  end

#lecture code
  def guess(st, number) do
    if String.length(number) == 4
    and noRepeats(number) and Regex.match?(~r/^\d+$/, number) do
        %{st | guesses: MapSet.put(st.guesses, number) }
    end
  end

def noRepeats(number) do
  if String.at(number, 0) == String.at(number, 1)
  or String.at(number, 0) == String.at(number, 2)
  or String.at(number, 0) == String.at(number, 3)
  or String.at(number,1) == String.at(number, 2)
  or String.at(number,1) == String.at(number, 3)
  or String.at(number,2) == String.at(number, 3) do
    false
  else
    true
  end
end

 def view(st) do
   guesses =  MapSet.to_list(st.guesses)
   guess = Enum.at(guesses, 0)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 1)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 2)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 3)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 4)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 5)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 6)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
   guess = Enum.at(guesses, 7)
   {bulls, cows} = countbulls(guess, st.secret)
   %{
     guess: guess,
     bullsandcows: "#{bulls}B#{cows}C"
   }
 end

def countbulls(guess, secret) do
  if String.length(guess) == 0 do
    {0, 0}
  else
    guess |> String.split("", trim: true)
    secret |> String.split("", trim: true)
    Enum.zip(guess, secret) |>
    Enum.reduce({0,0}, fn {g,s},{bulls,cows} ->
      cond do
        g == s      -> {bulls + 1, cows}
        g in secret -> {bulls, cows + 1}
        true        -> {bulls, cows}
      end
    end)
  end
end


defp getRandomNum() do
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    one = 0
    two = 0
    three = 0
    four = 0
    number = ""
    one = Enum.random(array)
    array -- one
    array ++ 0
    two = Enum.random(array)
    array -- two
    three = Enum.random(array)
    array -- three
    four = Enum.random(array)
    array -- four
    number = "#{one}#{two}#{three}#{four}"
    number
  end

end
