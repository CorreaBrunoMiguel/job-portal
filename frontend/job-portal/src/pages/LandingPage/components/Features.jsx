import React from "react";

import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";

const Features = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
            Tudo Que Você Precisa Saber Para
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Vencer
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Seja na procura por uma nova oportunidade or para encontrar o
            candidato perfeito, nós temos as ferramentas necessárias para fazer
            acontecer.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2 lg:gap-24">
          {/* Job Seekers Section */}
          <div>
            <div className="mb-12 text-center">
              <h3 className="mb-4 text-3xl font-bold text-gray-900">
                Procurando uma Vaga?
              </h3>
              <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
            </div>

            <div className="space-y-8">
              {jobSeekerFeatures.map((feature, index) => (
                <div key={index} className="">
                  <div className="group flex items-start space-x-4 rounded-2xl p-6 transition-all duration-300 hover:bg-blue-50">
                    <feature.icon className="" />
                  </div>
                  <div>
                    <h4 className="">{feature.title}</h4>
                    <p className="">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recrutadores */}
          <div>
            <div className="">
              <h3 className="">Procurando um Candidato?</h3>
              <div className="" />
            </div>

            <div className="">
              {employerFeatures.map((feature, index) => (
                <div index={index} className="">
                  <div className="">
                    <feature.icon className="" />
                  </div>
                  <div>
                    <h4 className="">{feature.title}</h4>
                    <p className="">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
