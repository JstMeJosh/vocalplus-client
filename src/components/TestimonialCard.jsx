const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="bg-[#0d0d2b] border border-[#c9a84c]/30 rounded-xl p-6 flex flex-col gap-4 hover:border-[#c9a84c] transition-all duration-300">
      <div className="flex gap-3">
        <div className="text-[#c9a84c] text-4xl font-serif">"</div>
        <p className="text-gray-300 text-sm leading-relaxed">{testimonial.text}</p>
        <div className="text-[#c9a84c] text-4xl font-serif">"</div>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <span className="bg-[#c9a84c] text-[#07071b] font-bold w-10 h-10 rounded-full flex items-center justify-center text-sm flex-shrink-0">
          {testimonial.avatar}
        </span>
        <div>
          <p className="text-white font-bold text-sm">{testimonial.name}</p>
          <p className="text-[#c9a84c] text-xs">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
};
export default TestimonialCard;